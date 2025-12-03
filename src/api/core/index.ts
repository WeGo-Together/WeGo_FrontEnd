import { notFound, redirect } from 'next/navigation';

import axios from 'axios';

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

    return Promise.reject(error);
  },
);
