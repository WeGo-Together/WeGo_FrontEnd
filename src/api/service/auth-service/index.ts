import { authAPI } from '@/api/core/auth';
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
    const data = await authAPI.post<LoginResponse>('/api/v1/auth/login', payload);

    setAccessToken(data.accessToken, data.expiresIn);
    return data;
  },

  // 회원가입
  signup: async (payload: SignupRequest) => {
    return authAPI.post<SignupResponse>(`/api/v1/auth/signup`, payload);
  },

  // 로그아웃
  logout: async () => {
    await authAPI.post<void>('/api/v1/auth/logout', null);
    clearAccessToken();
  },

  // 액세스 토큰 재발급
  refresh: async () => {
    //prettier-ignore
    const data = await authAPI.post<RefreshResponse>('/api/v1/auth/refresh', {});
    setAccessToken(data.accessToken, data.expiresIn);
    return data;
  },

  // 회원 탈퇴
  withdraw: async () => {
    await authAPI.delete<void>('/api/v1/auth/withdraw');
    clearAccessToken();
  },

  // 구글 OAuth 코드 교환
  exchangeGoogleCode: async (payload: GoogleOAuthExchangeRequest) => {
    const data = await authAPI.post<GoogleOAuthExchangeResponse>('/api/v1/auth/google', payload);

    setAccessToken(data.accessToken, data.expiresIn);
    return data;
  },
});
