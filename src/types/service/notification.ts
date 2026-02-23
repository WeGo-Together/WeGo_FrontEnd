export type NotificationType =
  | 'FOLLOW'
  | 'GROUP_JOIN'
  | 'GROUP_LEAVE'
  | 'GROUP_CREATE'
  | 'GROUP_DELETE'
  | 'GROUP_JOIN_REQUEST'
  | 'GROUP_JOIN_APPROVED'
  | 'GROUP_JOIN_REJECTED'
  | 'GROUP_JOIN_KICKED';

export interface NotificationItem {
  id: number;
  message: string;
  readAt: string | null;
  createdAt: string;
  type: NotificationType;
  user: {
    id: number;
    nickname: string;
  };
  group: {
    id: number;
    title: string;
  } | null;
}

export interface NotificationList {
  notifications: NotificationItem[];
  nextCursor: number | null;
}

export interface GetNotificationListQueryParams {
  cursor?: number;
  size?: number;
}
