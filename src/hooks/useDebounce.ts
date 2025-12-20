import { useEffect } from "react";

const useDebounce = <V>(
  value: V,
  trigger: (value: V) => void,
  delayInMs: number
) => {
  useEffect(() => {
    const timeout = setTimeout(async () => {
      trigger(value);
    }, delayInMs)

    return () => {
      clearTimeout(timeout);
    }
  }, [value, trigger, delayInMs])
}

export default useDebounce
