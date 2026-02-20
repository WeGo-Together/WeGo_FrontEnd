import { baseAPI } from '@/api/core';
import { GetNotificationListQueryParams, NotificationList } from '@/types/service/notification';

export const notificationServiceRemote = () => ({
  updateRead: async (notificationId: number) => {
    await baseAPI.post(`/api/v1/notifications/${notificationId}/read`);
  },

  updateReadAll: async () => {
    await baseAPI.post(`/api/v1/notifications/read-all`);
  },

  getList: async (queryParams: GetNotificationListQueryParams) => {
    return await baseAPI.get<NotificationList>(`/api/v1/notifications`, {
      params: { ...queryParams },
    });
  },

  getUnreadCount: async () => {
    return await baseAPI.get<number>(`/api/v1/notifications/unread-count`);
  },
});
