import { useQuery } from '@tanstack/react-query';

import { API } from '@/api';
import { notificationKeys } from '@/lib/query-key/query-key-notification';

export const useGetNotificationUnreadCount = () => {
  const isAuthenticated = typeof window !== 'undefined' && document.cookie.includes('accessToken');

  return useQuery({
    queryKey: notificationKeys.unReadCount(),
    queryFn: () => API.notificationService.getUnreadCount(),
    retry: false, // 재시도 안 함
    enabled: isAuthenticated,
  });
};
