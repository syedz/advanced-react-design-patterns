export const debounce = (fn: (...args: any[]) => void, delay: number) => {
  let timerId: ReturnType<typeof setTimeout> | undefined;

  return (...args: any[]) => {
    // If the function is called again before the delay, clear the previous timer
    if (timerId) {
      clearTimeout(timerId);
    }

    // Set a new timer to execute the function after the delay
    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};