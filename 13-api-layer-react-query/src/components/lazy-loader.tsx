import React, { useState, useEffect } from 'react';

interface LazyLoaderProps {
  show: boolean;
  delay?: number;
  defaultContent: React.ReactNode;
}

const LazyLoader: React.FC<LazyLoaderProps> = ({ 
  show, 
  delay = 0, 
  defaultContent 
}) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!show) {
      setShowLoader(false);
      return;
    }

    if (delay === 0) {
      setShowLoader(true);
    } else {
      // Wait for the delay before showing the loader
      timeoutId = setTimeout(() => setShowLoader(true), delay);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [show, delay]);

  return <>{showLoader ? "Loading..." : defaultContent}</>;
};

export default LazyLoader;