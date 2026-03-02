export const IDLE = "IDLE";
export const PENDING = "PENDING";
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";

export const API_STATUS = { IDLE, PENDING, SUCCESS, ERROR } as const;
export type ApiStatus = typeof API_STATUS[keyof typeof API_STATUS];