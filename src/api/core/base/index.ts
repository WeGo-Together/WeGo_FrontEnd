import axios from 'axios';

import { getAccesstoken } from '@/lib/auth/token';
import { CommonErrorResponse } from '@/types/service/common';

import { API } from '../..';
import { createApiHelper } from '../lib/apiHelper';

const baseInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 20000,
});

baseInstance.interceptors.request.use(async (config) => {
  const token = await getAccesstoken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

baseInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const isServer = typeof window === 'undefined';

    const errorResponse = new CommonErrorResponse(error.response?.data);
    const status = errorResponse.status;
    const originalRequest = error.config;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await API.authService.refresh();
        return baseInstance(originalRequest);
      } catch (refreshError) {
        if (isServer) {
          throw refreshError;
        } else {
          const currentPath = window.location.pathname + window.location.search;
          window.location.href = `/login?error=unauthorized&path=${encodeURIComponent(currentPath)}`;
        }
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

export const baseAPI = createApiHelper(baseInstance);
