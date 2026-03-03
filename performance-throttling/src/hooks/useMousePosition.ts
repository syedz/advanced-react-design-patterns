import { useEffect, useState } from "react";
import { throttle } from "../helpers/throttle";

interface MouseOptions {
  throttleTime?: number;
}

export const useMousePosition = (options?: MouseOptions) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const throttleTime = options?.throttleTime || 200;

  useEffect(() => {
    // Create the throttled handler
    const handleMouseMove = throttle((e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    }, throttleTime);

    window.addEventListener("mousemove", handleMouseMove);
    
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [throttleTime]);

  return position;
};