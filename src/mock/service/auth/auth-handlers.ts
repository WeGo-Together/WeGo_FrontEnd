import { http, HttpResponse } from 'msw';

import {
  LoginRequest,
  LoginResponse,
  RefreshResponse,
  SignupRequest,
  SignupResponse,
} from '@/types/service/auth';

import { createMockErrorResponse, createMockSuccessResponse } from '../common/common-mock';
import {
  createLoginResponse,
  createSignupResponse,
  isEmailTaken,
  isNicknameTaken,
} from './auth-utils';

//  회원가입
const signupMock = http.post('*/api/v1/auth/signup', async ({ request }) => {
  const body = (await request.json()) as SignupRequest;

  if (isEmailTaken(body.email)) {
    return HttpResponse.json(
      createMockErrorResponse({
        status: 400,
        detail: '이미 존재하는 이메일입니다.',
        errorCode: 'A002',
      }),
      { status: 400 },
    );
  }

  if (isNicknameTaken(body.nickName)) {
    return HttpResponse.json(
      createMockErrorResponse({
        status: 400,
        detail: '이미 존재하는 닉네임입니다.',
        errorCode: 'A003',
      }),
      { status: 400 },
    );
  }

  const response = createSignupResponse(body.email, body.nickName, body.password);

  return HttpResponse.json(createMockSuccessResponse<SignupResponse>(response));
});

// 로그인
const loginMock = http.post('*/api/v1/auth/login', async ({ request }) => {
  const body = (await request.json()) as LoginRequest;

  try {
    const response = createLoginResponse(body.email, body.password);

    return HttpResponse.json(createMockSuccessResponse<LoginResponse>(response), {
      headers: {
        'Set-Cookie': 'refreshToken=mock-refresh-token; Path=/; HttpOnly; SameSite=Strict; Secure',
      },
    });
  } catch {
    return HttpResponse.json(
      createMockErrorResponse({
        status: 400,
        detail: '이메일 또는 비밀번호가 올바르지 않습니다.',
        errorCode: 'A001',
      }),
      { status: 400 },
    );
  }
});

// 로그아웃
const logoutMock = http.post('*/api/v1/auth/logout', async () => {
  return HttpResponse.json(createMockSuccessResponse<void>(undefined));
});

// 액세스 토큰 재발급
const refreshMock = http.post('*/api/v1/auth/refresh', async ({ cookies }) => {
  const refreshToken = cookies['refreshToken'];

  if (!refreshToken) {
    return HttpResponse.json(
      createMockErrorResponse({
        status: 401,
        detail: '리프레시 토큰이 없습니다.',
        errorCode: 'A004',
      }),
      { status: 401 },
    );
  }

  const response: RefreshResponse = {
    accessToken: 'refreshed-mock-access-token',
    tokenType: 'Bearer',
    expiresIn: 3600,
    expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
  };

  return HttpResponse.json(createMockSuccessResponse<RefreshResponse>(response));
});

export const authHandlers = [signupMock, loginMock, logoutMock, refreshMock];
