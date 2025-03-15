import { useCallback, useEffect, useState } from "react";

export const useAsyncState = <T, P = void>(
  promiseCreator: (params?: P) => Promise<T>,
  deps: React.DependencyList = [],
  options?: {
    initialValue?: T;
    onSuccess?: (value: T) => void;
    onError?: (error: unknown) => void;
    mergeData?: (prev: T | undefined, next: T) => T;
  },
): {
  value: T | undefined;
  loading: boolean;
  error: unknown;
  reset: () => void;
  fetchMore: (params?: P) => void;
} => {
  const [value, setValue] = useState<T | undefined>(options?.initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const perform = useCallback(
    async (params?: P, signal?: AbortSignal): Promise<void> => {
      setLoading(true);
      setError(undefined);

      try {
        const result = await promiseCreator(params);
        if (!signal?.aborted) {
          setValue((prev) =>
            params && options?.mergeData
              ? options.mergeData(prev, result)
              : result,
          );
          options?.onSuccess?.(result);
        }
      } catch (err) {
        if (!signal?.aborted) {
          setError(err);
          options?.onError?.(err);
          console.error("useAsyncState: Error while resolving promise", err);
        }
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [promiseCreator, options],
  );

  const fetchMore = useCallback((params?: P) => perform(params), [perform]);

  const reset = useCallback(() => {
    setValue(options?.initialValue);
    setLoading(false);
    setError(undefined);
  }, [options?.initialValue]);

  useEffect(() => {
    const abortController = new AbortController();
    perform(undefined, abortController.signal);
    return () => abortController.abort();
  }, deps);

  return { value, loading, error, fetchMore, reset };
};
