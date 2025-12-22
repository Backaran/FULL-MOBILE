import { useEffect, useRef } from 'react';

export const useDebounce = <T,>(
  action: (value: T) => void,
  value: T,
  delay?: number
) => {
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (!delay) {
      action(value);
      return;
    }

    const timeout = setTimeout(() => {
      action(value);
    }, delay);

    return () => clearTimeout(timeout);

  }, [action, value, delay]);
}