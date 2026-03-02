import { useState } from "react";
import { useApiStatus } from "./use-api-status";
import { PENDING, SUCCESS, ERROR } from "../../constants/api-status";

interface ApiConfig<T> {
  initialData?: T;
}

export function useApi<T>(fn: (...args: any[]) => Promise<T>, config: ApiConfig<T> = {}) {
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