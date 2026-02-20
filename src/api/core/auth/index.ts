import axios from 'axios';

import { getAccessToken } from '@/lib/auth/token';
import { CommonErrorResponse } from '@/types/service/common';

import { createApiHelper } from '../lib/apiHelper';

const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 20000,
  withCredentials: true,
});

authInstance.interceptors.request.use(async (config) => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    if (refreshToken) {
      config.headers.Cookie = `refreshToken=${refreshToken}`;
    }
  }

  const accessToken = await getAccessToken();
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

authInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return new CommonErrorResponse(error.response?.data);
  },
);

export const authAPI = createApiHelper(authInstance);
