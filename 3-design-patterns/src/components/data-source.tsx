import React, { useState, useEffect } from 'react';

interface DataSourceProps {
  getData: () => Promise<any>;
  resourceName: string;
  children: React.ReactNode;
}

export const DataSource: React.FC<DataSourceProps> = ({ 
  getData = async () => {}, 
  resourceName, 
  children 
}) => {
  const [resource, setResource] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const data = await getData();
      setResource(data);
    })();
  }, [getData]);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { 
            [resourceName]: resource 
          });
        }
        return child;
      })}
    </>
  );
};