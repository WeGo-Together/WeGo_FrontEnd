'use client';

import { useRouter } from 'next/navigation';

import { AxiosError } from 'axios';

import { API } from '@/api';
import { LoginRequest } from '@/types/service/auth';
import { CommonErrorResponse } from '@/types/service/common';

export const useLogin = () => {
  const router = useRouter();

  const handleLogin = async (payload: LoginRequest, formApi: { reset: () => void }) => {
    try {
      const result = await API.authService.login(payload);
      // 📜 추후 삭제
      console.log('login success:', result);

      formApi.reset();
      router.push('/');
    } catch (error) {
      const axiosError = error as AxiosError<CommonErrorResponse>;
      const problem = axiosError.response?.data;

      // 📜 에러 UI 결정나면 변경
      if (problem) {
        console.error('[LOGIN ERROR]', problem.errorCode, problem.detail);
        alert(problem.detail || '로그인에 실패했습니다.');
      } else {
        console.error(error);
        alert('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return handleLogin;
};
