import { useEffect } from 'react';

export const useDebounceEffect = <R, Q>(
  search: Q,
  canStart: (search: Q) => boolean,
  onStart: (search: Q, signal: AbortSignal) => Promise<R>,
  onStop: (result?: R) => void,
  delayInMs: number
) => {
  useEffect(() => {
    const abortController = new AbortController();
    const timeout = setTimeout(async () => {
      if (canStart(search)) {
        const result: R = await onStart(search, abortController.signal);
        onStop(result);
      } else {
        onStop();
      }
    }, delayInMs);

    return () => {
      clearTimeout(timeout);
      abortController.abort();
    };
  }, [search, canStart, onStart, onStop, delayInMs]);
}