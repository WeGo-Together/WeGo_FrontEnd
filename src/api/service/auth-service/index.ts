import type { AxiosError } from 'axios';

import { baseAPI } from '@/api/core';
import { clearAccessToken, setAccessToken } from '@/lib/auth/token';
import {
  LoginRequest,
  LoginResponse,
  RefreshResponse,
  SignupRequest,
  SignupResponse,
} from '@/types/service/auth';
import { CommonErrorResponse } from '@/types/service/common';

export const isProblemDetailError = (error: unknown): error is AxiosError<CommonErrorResponse> => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as AxiosError).isAxiosError === true
  );
};

export const authServiceRemote = () => ({
  // 로그인
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    const { data } = await baseAPI.post<LoginResponse>('/auth/login', payload);

    setAccessToken(data.accessToken, data.expiresIn);
    return data;
  },

  // 회원가입
  signup: async (payload: SignupRequest): Promise<SignupResponse> => {
    const { data } = await baseAPI.post<SignupResponse>('/auth/signup', payload);
    return data;
  },

  // 로그아웃
  logout: async (): Promise<void> => {
    try {
      await baseAPI.post('/auth/logout');
    } finally {
      clearAccessToken();
    }
  },

  // 액세스 토큰 재발급
  refresh: async () => {
    const { data } = await baseAPI.post<RefreshResponse>('/auth/refresh');
    setAccessToken(data.accessToken, data.expiresIn);

    return data;
  },
});
