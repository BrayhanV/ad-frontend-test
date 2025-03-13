import { useCallback, useEffect, useState } from 'react';

export const useAsyncState = <T>(
  promiseCreator: () => Promise<T>,
  deps: React.DependencyList = [],
  options?: {
    initialValue?: T;
    onSuccess?: (value: T) => void;
    onError?: (error: unknown) => void;
  }
): { value: T | undefined; loading: boolean; error: unknown } => {
  const [value, setValue] = useState<T | undefined>(options?.initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const perform = useCallback(
    async (signal?: AbortSignal): Promise<void> => {
      setLoading(true);
      setError(undefined);

      try {
        const result = await promiseCreator();
        if (!signal?.aborted) {
          setValue(result);
          options?.onSuccess?.(result);
        }
      } catch (err) {
        if (!signal?.aborted) {
          setError(err);
          options?.onError?.(err);
          console.error('useAsyncState: Error while resolving promise', err);
        }
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [promiseCreator, options]
  );

  useEffect(() => {
    const abortController = new AbortController();
    perform(abortController.signal).catch(() => {});
    return () => abortController.abort();
  }, deps);

  return { value, loading, error };
};