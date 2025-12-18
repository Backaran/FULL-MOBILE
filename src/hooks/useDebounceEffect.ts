import { useEffect } from 'react';

const useDebounceEffect = <V>(
  value: V,
  canTrigger: (value: V) => boolean,
  trigger: (value: V) => void,
  delayInMs: number
) => {
  useEffect(() => {
    const timeout = setTimeout(async () => {
      canTrigger(value) && trigger(value);
    }, delayInMs);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, canTrigger, trigger, delayInMs]);
}

export default useDebounceEffect;
