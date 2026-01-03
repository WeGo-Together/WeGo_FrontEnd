export type NotificationType =
  | 'follow'
  | 'group-join'
  | 'group-leave'
  | 'group-create'
  | 'group-delete'
  | 'group-join-request'
  | 'group-join-approved'
  | 'group-join-rejected'
  | 'group-join-kicked';

type NotificationTypeWithoutGroup = 'follow';
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
