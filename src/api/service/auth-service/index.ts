import { api } from '@/api/core';
import { clearAccessToken, setAccessToken } from '@/lib/auth/token';
import {
  GoogleOAuthExchangeRequest,
  GoogleOAuthExchangeResponse,
  LoginRequest,
  LoginResponse,
  RefreshResponse,
  SignupRequest,
  SignupResponse,
} from '@/types/service/auth';

export const authServiceRemote = () => ({
  // 로그인
  login: async (payload: LoginRequest) => {
    const data = await api.post<LoginResponse>('/auth/login', payload, { withCredentials: true });

    setAccessToken(data.accessToken, data.expiresIn);
    return data;
  },

  // 회원가입
  signup: (payload: SignupRequest) => api.post<SignupResponse>(`/auth/signup`, payload),

  // 로그아웃
  logout: async () => {
    await api.post<void>('/auth/logout', null, { withCredentials: true });
    clearAccessToken();
  },

  // 액세스 토큰 재발급
  refresh: async (redirect: boolean = true) => {
    const data = await api.post<RefreshResponse>(
      '/auth/refresh',
      {},
      { _retry: true, withCredentials: true, skipAuthRedirect: redirect },
    );

    setAccessToken(data.accessToken, data.expiresIn);
    return data;
  },

  // 회원 탈퇴
  withdraw: async () => {
    await api.delete<void>('/auth/withdraw', { withCredentials: true });
    clearAccessToken();
  },

  // 구글 OAuth 코드 교환
  exchangeGoogleCode: async (payload: GoogleOAuthExchangeRequest) => {
    const data = await api.post<GoogleOAuthExchangeResponse>('/auth/google', payload, {
      withCredentials: true,
    });

    setAccessToken(data.accessToken, data.expiresIn);

    return data;
  },
});
