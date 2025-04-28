import { AxiosRequestConfig } from "axios";
import axiosInstance from "../interceptors/axios-instance";

export const HttpClient = {
  get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  },

  post: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  },

  put: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
  },

  patch: async <T = any>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.patch<T>(url, data, config);
    return response.data;
  },

  delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
  },

  fetcher: async <T = any>(args: string | [string, AxiosRequestConfig]): Promise<T> => {
    const [url, config] = Array.isArray(args) ? args : [args, {}];
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  },
};
