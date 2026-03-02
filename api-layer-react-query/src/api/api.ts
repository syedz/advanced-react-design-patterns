import axios, { 
  type AxiosInstance, 
  type AxiosRequestConfig, 
  type AxiosResponse 
} from "axios";

const axiosParams = {
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:9000" : "/",
};

const axiosInstance = axios.create(axiosParams);

export const didAbort = (error: any) => axios.isCancel(error) && { aborted: true };
export const isApiError = (error: any) => axios.isAxiosError(error);

const withLogger = async <T>(promise: Promise<T>): Promise<T> => {
  return promise.catch((error) => {
    // Optional: Only log if an environment variable is set
    if (!process.env.REACT_APP_DEBUG_API) throw error;

    if (error.response) {
      console.log("Response Error Data:", error.response.data);
      console.log("Status Code:", error.response.status);
      console.log("Headers:", error.response.headers);
    } else if (error.request) {
      console.log("No Response Received (Request):", error.request);
    } else {
      console.log("Request Setup Error:", error.message);
    }
    console.log("Axios Config:", error.config);

    throw error;
  });
};

const withAbort = (fn: any): ((...args: any[]) => Promise<AxiosResponse<any>>) => {
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
    return withLogger(withAbort(axios.get)(url, config));
  },
  post<T>(url: string, data: any, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return withLogger(withAbort(axios.post)(url, data, config));
  },
  put<T>(url: string, data: any, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return withLogger(withAbort(axios.put)(url, data, config));
  },
  patch<T>(url: string, data: any, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return withLogger(withAbort(axios.patch)(url, data, config));
  },
  delete<T>(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return withLogger(withAbort(axios.delete)(url, config));
  },
});

export default api(axiosInstance);