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

type NotificationTypeWithoutGroup = 'FOLLOW';
type NotificationTypeWithGroup = Exclude<NotificationType, NotificationTypeWithoutGroup>;

interface BaseNotification {
  id: number;
  message: string;
  readAt: string | null;
  createdAt: string;
  user: {
    id: number;
    nickname: string;
  };
}

interface NotificationWithoutGroup extends BaseNotification {
  type: NotificationTypeWithoutGroup;
  group: null;
}

interface NotificationWithGroup extends BaseNotification {
  type: NotificationTypeWithGroup;
  group: {
    id: number;
    title: string;
  } | null;
}

export type NotificationItem = NotificationWithoutGroup | NotificationWithGroup;

export interface NotificationList {
  notifications: NotificationItem[];
  nextCursor: number | null;
}

export interface GetNotificationListQueryParams {
  cursor?: number;
  size?: number;
}
