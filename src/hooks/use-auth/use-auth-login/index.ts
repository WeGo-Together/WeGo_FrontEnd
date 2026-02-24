'use client';

import { useSearchParams } from 'next/navigation';

import { useCallback, useState } from 'react';

import axios, { AxiosError } from 'axios';

import { API } from '@/api';
import { normalizePath } from '@/lib/auth/utils';
import { useAuthStore } from '@/stores';
import { LoginRequest } from '@/types/service/auth';
import { CommonErrorResponse } from '@/types/service/common';

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

export const useLogin = () => {
  const searchParams = useSearchParams();
  const [loginError, setLoginError] = useState<string | null>(null);
  const clearLoginError = useCallback(() => setLoginError(null), []);

  const { setIsAuthenticated } = useAuthStore();

  const handleLogin = async (payload: LoginRequest, formApi: { reset: () => void }) => {
    setLoginError(null);

    try {
      await API.authService.login(payload);

      formApi.reset();

      setIsAuthenticated(true);

      const nextPath = normalizePath(searchParams.get('path'));
      window.location.replace(nextPath);
    } catch (error) {
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
      setLoginError('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return { handleLogin, loginError, clearLoginError };
};
