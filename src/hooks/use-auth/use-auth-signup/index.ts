import { useRouter } from 'next/navigation';

import { AxiosError } from 'axios';

import { API } from '@/api';
import { SignupRequest } from '@/types/service/auth';
import { CommonErrorResponse } from '@/types/service/common';

export const useSignup = () => {
  const router = useRouter();

  const handleSignup = async (payload: SignupRequest, formApi: { reset: () => void }) => {
    try {
      await API.authService.signup(payload);

      formApi.reset();
      router.push('/login');
    } catch (error) {
      const axiosError = error as AxiosError<CommonErrorResponse>;
      const problem = axiosError.response?.data;

      // 📜 에러 UI 결정나면 변경
      if (problem) {
        console.error('[SIGNUP ERROR]', problem.errorCode, problem.detail);
        alert(problem.detail || '회원가입에 실패했습니다.');
      } else {
        console.error(error);
        alert('회원가입에 실패했습니다. 잠시 후에 다시 시도해주세요.');
      }
    }
  };

  return handleSignup;
};
