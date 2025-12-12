'use client';

import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { API } from '@/api';
import { userKeys } from '@/lib/query-key/query-key-user';

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      await API.authService.logout();
    } catch (error) {
      console.error('[LOGOUT ERROR]', error);
    } finally {
      // 로그인 유저 관련 캐시 정리
      queryClient.removeQueries({ queryKey: userKeys.all });
      Cookies.remove('userId');

      // 로컬 스토리지/추가 상태도 정리???

      router.push('/login');
    }
  };

  return handleLogout;
};
