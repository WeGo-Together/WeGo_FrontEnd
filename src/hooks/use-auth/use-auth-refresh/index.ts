'use client';

import { AxiosError } from 'axios';

import { API } from '@/api';
import { CommonErrorResponse } from '@/types/service/common';

export const useRefresh = () => {
  const handleRefresh = async () => {
    try {
      const result = await API.authService.refresh();

      // 📜 추후 삭제 (테스트 확인용)
      console.log('refresh success:', result);
      return result;
    } catch (error) {
      const axiosError = error as AxiosError<CommonErrorResponse>;
      const problem = axiosError.response?.data;

      // 📜 에러 UI 결정나면 변경
      if (problem) {
        console.error('[REFRESH ERROR]', problem.errorCode, problem.detail);
        alert(problem.detail || '토큰 갱신에 실패했습니다.');
      } else {
        console.error(error);
        alert('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return handleRefresh;
};
