import React, { useEffect, useState } from "react";

interface LazyLoaderProps {
  show?: boolean;
  delay?: number;
}

const LazyLoader: React.FC<LazyLoaderProps> = ({ show = false, delay = 0 }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!show) {
      setShowLoader(false);
      return;
    }

    if (delay === 0) {
      setShowLoader(true);
    } else {
      timeout = setTimeout(() => setShowLoader(true), delay);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [show, delay]);

  return showLoader ? <h3>Loading...</h3> : null;
};

export default LazyLoader;