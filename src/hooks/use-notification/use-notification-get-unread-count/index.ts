import { useQuery } from '@tanstack/react-query';

import { API } from '@/api';
import { notificationKeys } from '@/lib/query-key/query-key-notification';
import { useAuth } from '@/providers';

export const useGetNotificationUnreadCount = () => {
  const { accessToken } = useAuth();
  const queryResult = useQuery({
    queryKey: notificationKeys.unReadCount(),
    queryFn: () => API.notificationService.getUnreadCount(),
    enabled: !!accessToken.value,
  });

  const finalData = accessToken.value ? (queryResult.data ?? 0) : 0;

  return {
    ...queryResult,
    data: finalData,
  };
};
