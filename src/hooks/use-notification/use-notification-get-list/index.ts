import { useInfiniteQuery } from '@tanstack/react-query';

import { API } from '@/api';
import { notificationKeys } from '@/lib/query-key/query-key-notification';
import { GetNotificationListQueryParams } from '@/types/service/notification';

export const useGetNotificationsInfinite = (params?: GetNotificationListQueryParams) => {
  return useInfiniteQuery({
    queryKey: notificationKeys.list(),
    queryFn: ({ pageParam }) => API.notificationService.getList({ ...params, cursor: pageParam }),
    initialPageParam: params?.cursor,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: (data) => data.pages.flatMap((page) => page.notifications) || [],
  });
};
