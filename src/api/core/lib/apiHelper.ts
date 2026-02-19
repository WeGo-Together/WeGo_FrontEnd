import { AxiosInstance, AxiosRequestConfig } from 'axios';

import { CommonSuccessResponse } from '@/types/service/common';

export const createApiHelper = (axios: AxiosInstance) => ({
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axios.get<CommonSuccessResponse<T>>(url, config);
    return response.data.data;
  },
  post: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axios.post<CommonSuccessResponse<T>>(url, data, config);
    return response.data.data;
  },
  put: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axios.put<CommonSuccessResponse<T>>(url, data, config);
    return response.data.data;
  },
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axios.delete<CommonSuccessResponse<T>>(url, config);
    return response.data.data;
  },
  patch: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axios.patch<CommonSuccessResponse<T>>(url, data, config);
    return response.data.data;
  },
});
