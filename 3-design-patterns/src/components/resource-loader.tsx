import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ResourceLoaderProps {
  resourceUrl: string;
  resourceName: string;
  children: React.ReactNode;
}

export const ResourceLoader: React.FC<ResourceLoaderProps> = ({ 
  resourceUrl, 
  resourceName, 
  children 
}) => {
  const [resource, setResource] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get(resourceUrl);
      setResource(response.data);
    })();
  }, [resourceUrl]);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Dynamic prop injection: if resourceName is "book", 
          // child receives { book: resource }
          return React.cloneElement(child as React.ReactElement<any>, { 
            [resourceName]: resource 
          });
        }
        return child;
      })}
    </>
  );
};