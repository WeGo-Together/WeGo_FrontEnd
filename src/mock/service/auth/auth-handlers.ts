import { http, HttpResponse } from 'msw';

import { LoginRequest, LoginResponse, SignupRequest } from '@/types/service/auth';
import { CommonErrorResponse } from '@/types/service/common';

import {
  createLoginResponse,
  createSignupResponse,
  isEmailTaken,
  isNicknameTaken,
} from './auth-utils';

const signupMock = http.post('*/api/v1/auth/signup', async ({ request }) => {
  const body = (await request.json()) as SignupRequest;

  if (isEmailTaken(body.email)) {
    const errorBody: CommonErrorResponse = {
      type: 'https://example.com/errors/email-duplicate',
      title: 'EMAIL_DUPLICATE',
      status: 400,
      detail: '이미 존재하는 이메일입니다.',
      instance: '/api/v1/auth/signup',
      errorCode: 'A002',
    };
    return HttpResponse.json<CommonErrorResponse>(errorBody, { status: 400 });
  }

  if (isNicknameTaken(body.nickName)) {
    const errorBody: CommonErrorResponse = {
      type: 'https://example.com/errors/nickname-duplicate',
      title: 'NICKNAME_DUPLICATE',
      status: 400,
      detail: '이미 존재하는 닉네임입니다.',
      instance: '/api/v1/auth/signup',
      errorCode: 'A003',
    };
    return HttpResponse.json<CommonErrorResponse>(errorBody, { status: 400 });
  }
  const response = createSignupResponse(body.email, body.nickName, body.password);
  return HttpResponse.json(response, { status: 201 });
});

const loginMock = http.post('*/api/v1/auth/login', async ({ request }) => {
  const body = (await request.json()) as LoginRequest;

  try {
    const response = createLoginResponse(body.email, body.password);
    return HttpResponse.json<LoginResponse>(response, { status: 200 });
  } catch {
    const errorBody: CommonErrorResponse = {
      type: 'https://example.com/errors/invalid-credentials',
      title: 'INVALID_CREDENTIALS',
      status: 400,
      detail: '이메일 또는 비밀번호가 올바르지 않습니다.',
      instance: '/api/v1/auth/login',
      errorCode: 'A001',
    };
    return HttpResponse.json(errorBody, { status: 400 });
  }
});

const logoutMock = http.post('*/api/v1/auth/logout', async ({}) => {
  return new HttpResponse(null, { status: 204 });
});

export const authHandlers = [signupMock, loginMock, logoutMock];
