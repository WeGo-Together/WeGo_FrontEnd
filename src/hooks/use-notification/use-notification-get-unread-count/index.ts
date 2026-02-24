import { useQuery } from '@tanstack/react-query';

import { API } from '@/api';
import { notificationKeys } from '@/lib/query-key/query-key-notification';
import { useAuthStore } from '@/stores';

export const useGetNotificationUnreadCount = () => {
  const { isAuthenticated } = useAuthStore();
  const queryResult = useQuery({
    queryKey: notificationKeys.unReadCount(),
    queryFn: () => API.notificationService.getUnreadCount(),
    enabled: isAuthenticated,
    throwOnError: false,
    retry: false,
  });

  const unReadCount = isAuthenticated ? (queryResult.data ?? 0) : 0;

  return {
    ...queryResult,
    unReadCount,
  };
};
