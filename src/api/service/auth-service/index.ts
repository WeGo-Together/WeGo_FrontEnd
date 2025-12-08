import type { AxiosError } from 'axios';

import { baseAPI } from '@/api/core';
import { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '@/types/service/auth';
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
    const { data } = await baseAPI.post<LoginResponse>('/api/v1/auth/login', payload);
    return data;
  },

  // 회원가입
  signup: async (payload: SignupRequest): Promise<SignupResponse> => {
    const { data } = await baseAPI.post<SignupResponse>('/api/v1/auth/signup', payload);
    return data;
  },

  // 로그아웃
  logout: async (): Promise<void> => {
    await baseAPI.post('/api/v1/auth/logout');
  },
});
