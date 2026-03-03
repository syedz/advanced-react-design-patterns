import React, { useState, useEffect } from 'react';

interface DataSourceWithRenderProps {
  getData: () => Promise<any>;
  render: (resource: any) => React.ReactNode;
}

export const DataSourceWithRender: React.FC<DataSourceWithRenderProps> = ({ 
  getData = async () => {}, 
  render 
}) => {
  const [resource, setResource] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const data = await getData();
      setResource(data);
    })();
  }, [getData]);

  return <>{render(resource)}</>;
};