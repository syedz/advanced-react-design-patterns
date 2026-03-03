export const throttle = (fn: (...args: any[]) => void, wait: number) => {
  let timerId: ReturnType<typeof setTimeout> | undefined;
  let inThrottle: boolean = false;
  let lastTime: number = 0;

  return (...args: any[]) => {
    if (!inThrottle) {
      // First execution
      fn(...args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      // Delay subsequent executions
      if (timerId) clearTimeout(timerId);
      
      timerId = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn(...args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};