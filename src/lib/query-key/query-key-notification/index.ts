export const notificationKeys = {
  all: ['notifications'] as const,
  list: () => ['notifications', 'list'],
  unReadCount: () => [...notificationKeys.all, 'unread-count'],
};
