import { notFound, redirect } from 'next/navigation';

import axios from 'axios';

import { CommonErrorResponse, CommonSuccessResponse } from '@/types/service/common';

export const baseAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 20000,
});

baseAPI.interceptors.request.use(async (config) => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    // // Server 환경
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } else {
    // Client 환경
    const match = document.cookie.match(new RegExp('(^| )accessToken=([^;]+)'));
    const token = match ? decodeURIComponent(match[2]) : undefined;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

baseAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const status = error.response?.status;
    if (status) {
      if (status === 401) {
        redirect('/signin?error=unauthorized');
      }
      if (status === 404) {
        notFound();
      }
    }

    const errorResponse: CommonErrorResponse = error.response?.data || {
      type: 'about:blank',
      title: 'Network Error',
      status: 0,
      detail: '서버와 연결할 수 없습니다.',
      instance: error.config?.url || '',
      errorCode: 'NETWORK_ERROR',
    };

    throw errorResponse;
  },
);

// 공통 응답 형식 처리를 위한 api 헬퍼
export const api = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: async <T>(url: string, config?: any): Promise<T> => {
    const response = await baseAPI.get<CommonSuccessResponse<T>>(url, config);
    return response.data.data;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: async <T>(url: string, data?: any, config?: any): Promise<T> => {
    const response = await baseAPI.post<CommonSuccessResponse<T>>(url, data, config);
    return response.data.data;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put: async <T>(url: string, data?: any, config?: any): Promise<T> => {
    const response = await baseAPI.put<CommonSuccessResponse<T>>(url, data, config);
    return response.data.data;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete: async <T>(url: string, config?: any): Promise<T> => {
    const response = await baseAPI.delete<CommonSuccessResponse<T>>(url, config);
    return response.data.data;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  patch: async <T>(url: string, data?: any, config?: any): Promise<T> => {
    const response = await baseAPI.patch<CommonSuccessResponse<T>>(url, data, config);
    return response.data.data;
  },
};
