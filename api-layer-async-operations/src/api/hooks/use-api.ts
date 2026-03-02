import { useState } from "react";
import { useApiStatus } from "./use-api-status";
import { PENDING, SUCCESS, ERROR } from "../../constants/api-status";
import type { ApiStatus } from "../../constants/api-status";

interface ApiConfig<T> {
  initialData?: T;
}

/** Status flags derived from ApiStatus: isIdle, isPending, isSuccess, isError (updates when API_STATUS changes). */
type StatusFlags = { [K in ApiStatus as `is${Capitalize<Lowercase<K>>}`]: boolean };

export type UseApiReturn<T> = {
  data: T | undefined;
  setData: React.Dispatch<React.SetStateAction<T | undefined>>;
  status: ReturnType<typeof useApiStatus>["status"];
  setStatus: ReturnType<typeof useApiStatus>["setStatus"];
  error: unknown;
  exec: (...args: any[]) => Promise<{ data: T | null; error: unknown }>;
} & StatusFlags;

export function useApi<T>(fn: (...args: any[]) => Promise<T>, config: ApiConfig<T> = {}): UseApiReturn<T> {
  const [data, setData] = useState<T | undefined>(config.initialData);
  const [error, setError] = useState<unknown>();
  const { status, setStatus, ...normalisedStatuses } = useApiStatus();

  const exec = async (...args: any[]) => {
    try {
      setStatus(PENDING);
      const responseData = await fn(...args);
      setData(responseData);
      setStatus(SUCCESS);
      return { data: responseData, error: null };
    } catch (err) {
      setError(err);
      setStatus(ERROR);
      return { data: null, error: err };
    }
  };

  return {
    data,
    setData,
    status,
    setStatus,
    error,
    exec,
    ...normalisedStatuses,
  };
}