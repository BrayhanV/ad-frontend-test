import { renderHook, act, waitFor } from "@testing-library/react";
import { useAsyncState } from "./useAsyncState";

describe("useAsyncState", () => {
  const mockSuccessPromiseCreator = jest
    .fn()
    .mockImplementation(() => Promise.resolve({ data: "test-data" }));

  const mockErrorPromiseCreator = jest
    .fn()
    .mockImplementation(() => Promise.reject(new Error("test-error")));

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should initialize with correct default values", () => {
    const { result } = renderHook(() =>
      useAsyncState(mockSuccessPromiseCreator),
    );

    expect(result.current.value).toBeUndefined();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeUndefined();
    expect(typeof result.current.reset).toBe("function");
    expect(typeof result.current.fetchMore).toBe("function");
  });

  it("should initialize with provided initialValue", () => {
    const initialValue = { data: "initial-data" };
    const { result } = renderHook(() =>
      useAsyncState(mockSuccessPromiseCreator, [], { initialValue }),
    );

    expect(result.current.value).toEqual(initialValue);
  });

  it("should load data and update state on successful promise", async () => {
    const { result } = renderHook(() =>
      useAsyncState(mockSuccessPromiseCreator),
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.value).toEqual({ data: "test-data" });
    expect(result.current.error).toBeUndefined();
    expect(mockSuccessPromiseCreator).toHaveBeenCalledTimes(1);
  });

  it("should handle errors and update error state", async () => {
    const { result } = renderHook(() => useAsyncState(mockErrorPromiseCreator));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.value).toBeUndefined();
    expect(result.current.error).toBeDefined();

    if (result.current.error instanceof Error) {
      expect(result.current.error.message).toBe("test-error");
    } else {
      fail("Error should be an instance of Error");
    }

    expect(console.error).toHaveBeenCalledWith(
      "useAsyncState: Error while resolving promise",
      expect.any(Error),
    );
  });

  it("should call onSuccess callback when promise resolves", async () => {
    const onSuccess = jest.fn();
    const { result } = renderHook(() =>
      useAsyncState(mockSuccessPromiseCreator, [], { onSuccess }),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(onSuccess).toHaveBeenCalledWith({ data: "test-data" });
  });

  it("should call onError callback when promise rejects", async () => {
    const onError = jest.fn();
    const { result } = renderHook(() =>
      useAsyncState(mockErrorPromiseCreator, [], { onError }),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(onError).toHaveBeenCalledWith(expect.any(Error));
  });

  it("should reset state correctly", async () => {
    const initialValue = { data: "initial-data" };
    const { result } = renderHook(() =>
      useAsyncState(mockSuccessPromiseCreator, [], { initialValue }),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.value).toEqual({ data: "test-data" });

    act(() => {
      result.current.reset();
    });

    expect(result.current.value).toEqual(initialValue);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("should fetch more data with params", async () => {
    const { result } = renderHook(() =>
      useAsyncState(mockSuccessPromiseCreator),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    const params = { page: 2 };
    act(() => {
      result.current.fetchMore(params);
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(mockSuccessPromiseCreator).toHaveBeenCalledWith(params);
  });

  it("should merge data when fetchMore is called with mergeData option", async () => {
    const mergeData = jest.fn((prev, next) => ({
      ...next,
      data: [...(prev?.data || []), ...next.data],
    }));

    const initialValue = { data: ["initial-item"] };
    const firstResult = { data: ["first-item"] };
    const secondResult = { data: ["second-item"] };

    const mockPromiseCreator = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(firstResult))
      .mockImplementationOnce(() => Promise.resolve(secondResult));

    const { result } = renderHook(() =>
      useAsyncState(mockPromiseCreator, [], {
        initialValue,
        mergeData,
      }),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.value).toEqual(firstResult);

    const params = { page: 2 };
    act(() => {
      result.current.fetchMore(params);
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(mergeData).toHaveBeenCalledWith(firstResult, secondResult);

    expect(result.current.value).toEqual({
      data: ["first-item", "second-item"],
    });
  });

  it("should not update state when promise is aborted", async () => {
    const neverResolvingPromise = jest.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({ data: "never-gets-here" }), 10000);
        }),
    );

    let hookResult: ReturnType<typeof useAsyncState> | undefined;
    const { unmount } = renderHook(() => {
      const result = useAsyncState(neverResolvingPromise);
      hookResult = result;
      return result;
    });

    expect(hookResult).toBeDefined();

    if (hookResult) {
      expect(hookResult.loading).toBe(true);
    }

    unmount();

    expect(neverResolvingPromise).toHaveBeenCalledTimes(1);
  });

  it("should reload when dependencies change", async () => {
    let dependencies = [1];
    const { result, rerender } = renderHook(() =>
      useAsyncState(mockSuccessPromiseCreator, dependencies),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    dependencies = [2];
    rerender();

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(mockSuccessPromiseCreator).toHaveBeenCalledTimes(2);
  });
});
