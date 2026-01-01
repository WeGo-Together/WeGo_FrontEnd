'use client';

import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { userKeys } from '@/lib/query-key/query-key-user';
import { useAuth } from '@/providers';

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { setIsAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await API.authService.logout();
    } catch (error) {
      console.error('[LOGOUT ERROR]', error);
    } finally {
      // 로그인 유저 관련 캐시 정리
      queryClient.removeQueries({ queryKey: userKeys.all });

      setIsAuthenticated(false);

      router.push('/');
    }
  };

  return handleLogout;
};
