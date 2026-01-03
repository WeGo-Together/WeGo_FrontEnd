'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useCallback, useState } from 'react';

import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

import { API } from '@/api';
import { useAuth } from '@/providers';
import { LoginRequest } from '@/types/service/auth';
import { CommonErrorResponse } from '@/types/service/common';

const normalizePath = (raw: string | null) => {
  const value = (raw ?? '').trim();

  if (!value) return '/';

  if (value.startsWith('//') || value.includes('://')) return '/';

  return value.startsWith('/') ? value : `/${value}`;
};

const getLoginErrorMessage = (problem: CommonErrorResponse) => {
  if (
    problem.errorCode === 'USER_NOT_FOUND' ||
    problem.errorCode === 'INVALID_PASSWORD_VALUE' ||
    problem.errorCode === 'INVALID_INPUT_VALUE'
  ) {
    return '이메일 또는 비밀번호가 일치하지 않습니다.';
  }

  return '로그인에 실패했습니다.';
};

// 📜 proxy 설정 후 삭제
const isCommonErrorResponse = (e: unknown): e is CommonErrorResponse => {
  if (!e || typeof e !== 'object') return false;

  const obj = e as Record<string, unknown>;
  return (
    typeof obj.status === 'number' &&
    typeof obj.detail === 'string' &&
    typeof obj.errorCode === 'string' &&
    typeof obj.instance === 'string'
  );
};

export const useLogin = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);
  const clearLoginError = useCallback(() => setLoginError(null), []);

  const { setIsAuthenticated } = useAuth();

  const handleLogin = async (payload: LoginRequest, formApi: { reset: () => void }) => {
    setLoginError(null);

    try {
      const result = await API.authService.login(payload);
      // 📜 추후 삭제
      console.log('login success:', result);

      Cookies.set('userId', String(result.user.userId), {
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });

      formApi.reset();

      setIsAuthenticated(true);

      const nextPath = normalizePath(searchParams.get('path'));
      // window.location.replace(nextPath);

      router.prefetch(nextPath);
      router.replace(nextPath);
    } catch (error) {
      if (isCommonErrorResponse(error)) {
        console.error('[LOGIN ERROR]', error.errorCode, error.detail);
        setLoginError(getLoginErrorMessage(error));
        return;
      }

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<CommonErrorResponse>;
        const problem = axiosError.response?.data;

        if (problem) {
          console.error('[LOGIN ERROR]', problem.errorCode, problem.detail);
          setLoginError(getLoginErrorMessage(problem));
        }
        return;
      }

      console.error(error);
      setLoginError('알 수 없는 오류가 발생했습니다.');
    }
  };

  return { handleLogin, loginError, clearLoginError };
};
