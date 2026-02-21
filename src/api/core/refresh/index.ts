import axios from 'axios';

import { CommonErrorResponse } from '@/types/service/common';

import { createApiHelper } from '../lib/apiHelper';

const refreshInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 20000,
  withCredentials: true,
});

refreshInstance.interceptors.request.use(async (config) => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    if (refreshToken) {
      config.headers.Cookie = `refreshToken=${refreshToken}`;
    }
  }

  return config;
});

refreshInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    throw new CommonErrorResponse(error.response?.data);
  },
);

export const refreshAPI = createApiHelper(refreshInstance);
