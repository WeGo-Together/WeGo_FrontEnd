export type NotificationType = 'FOLLOW' | 'GROUP_JOIN' | 'EXIT' | 'GROUP_CREATE' | 'GROUP_DELETE';

export interface NotificationItem {
  id: number;
  receiverId: number;
  actorId: number;
  actorNickname: string;
  actorProfileImage: string;
  type: NotificationType;
  readAt: string | null;
  relatedId: number;
  relatedType: NotificationType;
  redirectUrl: string;
  createdAt: string;
  message: string;
}

export interface NotificationList {
  notifications: NotificationItem[];
  nextCursor: number | null;
}

export interface GetNotificationListQueryParams {
  cursor?: number;
  size?: number;
}
