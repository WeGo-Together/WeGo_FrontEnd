import { api } from '@/api/core';
import { clearAccessToken, setAccessToken } from '@/lib/auth/token';
import {
  LoginRequest,
  LoginResponse,
  RefreshResponse,
  SignupRequest,
  SignupResponse,
} from '@/types/service/auth';

export const authServiceRemote = () => ({
  // 로그인
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    const data = await api.post<LoginResponse>('/auth/login', payload);

    setAccessToken(data.accessToken, data.expiresIn);
    return data;
  },

  // 회원가입
  signup: async (payload: SignupRequest): Promise<SignupResponse> =>
    api.post<SignupResponse>(`/auth/signup`, payload),

  // 로그아웃
  logout: async (): Promise<void> => {
    await api.post<void>('/auth/logout');
    clearAccessToken();
  },

  // 액세스 토큰 재발급
  refresh: async (): Promise<RefreshResponse> => {
    const data = await api.post<RefreshResponse>('/auth/refresh');

    setAccessToken(data.accessToken, data.expiresIn);
    return data;
  },
});
