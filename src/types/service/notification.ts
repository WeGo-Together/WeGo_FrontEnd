export type NotificationType = 'FOLLOW' | 'ENTER' | 'EXIT' | 'CREATE' | 'CANCLE';

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
}

export interface NotificationList {
  notifications: NotificationItem[];
  nextCursor: number | null;
}

export interface GetNotificationListQueryParams {
  cursor?: number;
  size?: number;
}
