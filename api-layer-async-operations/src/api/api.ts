import axios, { 
  type AxiosInstance, 
  type AxiosRequestConfig, 
  type AxiosResponse 
} from "axios";

const axiosParams = {
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/",
};

const axiosInstance = axios.create(axiosParams);

export const didAbort = (error: any) => axios.isCancel(error) && { aborted: true };
export const isApiError = (error: any) => axios.isAxiosError(error);

const withAbort = (fn: any) => {
  return async (...args: any[]) => {
    const originalConfig = args[args.length - 1] || {};
    const { abort, ...config } = originalConfig;

    if (typeof abort === "function") {
      const source = axios.CancelToken.source();
      config.cancelToken = source.token;
      abort(source.cancel);
    }

    try {
      if (args.length > 2) {
        const [url, body] = args;
        return await fn(url, body, config);
      } else {
        const [url] = args;
        return await fn(url, config);
      }
    } catch (error: any) {
      if (didAbort(error)) {
        error.aborted = true;
      }
      throw error;
    }
  };
};

const api = (axios: AxiosInstance) => ({
  get<T>(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return withAbort(axios.get)(url, config);
  },
  post<T>(url: string, data: any, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return withAbort(axios.post)(url, data, config);
  },
  put<T>(url: string, data: any, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return withAbort(axios.put)(url, data, config);
  },
  patch<T>(url: string, data: any, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return withAbort(axios.patch)(url, data, config);
  },
  delete<T>(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return withAbort(axios.delete)(url, config)
  },
});

export default api(axiosInstance);