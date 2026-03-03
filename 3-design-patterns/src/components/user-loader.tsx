import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  age: number;
  country: string;
  books: string[];
}

interface UserLoaderProps {
  userId: string;
  children: React.ReactNode;
}

export const UserLoader: React.FC<UserLoaderProps> = ({ userId, children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      // Fetches data from the dynamic Express endpoint
      const response = await axios.get<User>(`/users/${userId}`);
      setUser(response.data);
    })();
  }, [userId]);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { user });
        }
        return child;
      })}
    </>
  );
};