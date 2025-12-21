import axios from 'axios';

import { CommonErrorResponse, CommonSuccessResponse } from '@/types/service/common';

import { API } from '..';

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
    const errorResponse: CommonErrorResponse = error.response?.data || {
      type: 'about:blank',
      title: 'Network Error',
      status: 0,
      detail: '서버와 연결할 수 없습니다.',
      instance: error.config?.url || '',
      errorCode: 'NETWORK_ERROR',
    };

    const status = error.response?.status ?? errorResponse.status;
    const isServer = typeof window === 'undefined';
    const originalRequest = error.config;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await API.authService.refresh();
        return baseAPI(originalRequest);
      } catch (refreshError) {
        if (isServer) {
          const { redirect } = await import('next/navigation');
          redirect('/login');
        } else {
          if (window.location.pathname === '/login') {
            throw errorResponse;
          }
          const currentPath = window.location.pathname + window.location.search;
          window.location.href = `/login?error=unauthorized&path=${encodeURIComponent(currentPath)}`;
        }
        throw refreshError;
      }
    }
    if (status === 404) {
      if (isServer) {
        const { notFound } = await import('next/navigation');
        notFound();
      }
    }

    throw errorResponse;
  },
);

type ApiVersionType = 'v1' | 'v2';

// 공통 응답 형식 처리를 위한 api 헬퍼
const apiHelper = (v: ApiVersionType = 'v1') => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: async <T>(url: string, config?: any): Promise<T> => {
    const response = await baseAPI.get<CommonSuccessResponse<T>>(`/api/${v}${url}`, config);
    return response.data.data;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: async <T>(url: string, data?: any, config?: any): Promise<T> => {
    const response = await baseAPI.post<CommonSuccessResponse<T>>(`/api/${v}${url}`, data, config);
    return response.data.data;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put: async <T>(url: string, data?: any, config?: any): Promise<T> => {
    const response = await baseAPI.put<CommonSuccessResponse<T>>(`/api/${v}${url}`, data, config);
    return response.data.data;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete: async <T>(url: string, config?: any): Promise<T> => {
    const response = await baseAPI.delete<CommonSuccessResponse<T>>(`/api/${v}${url}`, config);
    return response.data.data;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  patch: async <T>(url: string, data?: any, config?: any): Promise<T> => {
    const response = await baseAPI.patch<CommonSuccessResponse<T>>(`/api/${v}${url}`, data, config);
    return response.data.data;
  },
});

export const api = apiHelper('v1'); // breaking change 방지용
export const apiV1 = apiHelper('v1');
export const apiV2 = apiHelper('v2');
