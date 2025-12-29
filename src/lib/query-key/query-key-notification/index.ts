import { GetNotificationListQueryParams } from '@/types/service/notification';

export const notificationKeys = {
  all: ['notifications'] as const,
  list: (params?: GetNotificationListQueryParams) => [
    'notifications',
    'list',
    ...(params ? [params] : []),
  ],
  unReadCount: () => [...notificationKeys.all, 'unread-count'],
};
