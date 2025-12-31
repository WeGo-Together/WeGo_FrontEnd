import { apiV1 } from '@/api/core';
import { GetNotificationListQueryParams, NotificationList } from '@/types/service/notification';

export const notificationServiceRemote = () => ({
  updateRead: async (notificationId: number) => {
    await apiV1.post(`/notifications/${notificationId}/read`);
  },

  updateReadAll: async () => {
    await apiV1.post(`/notifications/read-all`);
  },

  getList: async (queryParams: GetNotificationListQueryParams) => {
    return await apiV1.get<NotificationList>(`/notifications`, {
      params: { ...queryParams },
    });
  },

  getUnreadCount: async () => {
    return await apiV1.get<number>(`/notifications/unread-count`);
  },
});
