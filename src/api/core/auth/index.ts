import axios from 'axios';

import { getAccesstoken } from '@/lib/auth/token';
import { CommonErrorResponse } from '@/types/service/common';

import { createApiHelper } from '../lib/apiHelper';

const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 20000,
});

authInstance.interceptors.request.use(async (config) => {
  const token = await getAccesstoken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    return new CommonErrorResponse(error.response?.data);
  },
);

export const authAPI = createApiHelper(authInstance);
