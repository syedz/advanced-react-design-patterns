import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  name: string;
  age: number;
  country: string;
  books: string[];
}

interface CurrentUserLoaderProps {
  children: React.ReactNode;
}

export const CurrentUserLoader: React.FC<CurrentUserLoaderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      // Fetches from the Express server endpoint defined in previous steps
      const response = await axios.get<User>('/current-user');
      setUser(response.data);
    })();
  }, []);

  return (
    <>
      {React.Children.map(children, (child) => {
        // Ensure we only clone valid React elements (not strings or null)
        if (React.isValidElement(child)) {
          // Injects the 'user' state as a prop into the child component
          return React.cloneElement(child as React.ReactElement<any>, { user });
        }
        return child;
      })}
    </>
  );
};