import { useState, useMemo } from "react";
import { IDLE, API_STATUS, type ApiStatus } from "../../constants/api-status";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

export const useApiStatus = (initialStatus: ApiStatus = IDLE) => {
  const [status, setStatus] = useState<ApiStatus>(initialStatus);

  const statuses = useMemo(() => {
    const entries = Object.values(API_STATUS).map((s) => [
      `is${capitalize(s)}`,
      s === status,
    ]);
    return Object.fromEntries(entries);
  }, [status]);

  return { status, setStatus, ...statuses };
};