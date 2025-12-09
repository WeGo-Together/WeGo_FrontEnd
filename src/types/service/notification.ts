import { Group } from './group';
import { User } from './user';

export type NotificationType =
  | 'follow'
  | 'group-join'
  | 'group-leave'
  | 'group-create'
  | 'group-delete';

export interface Notification {
  type: NotificationType;
  user: User;
  group?: Group;
  createdAt: string;
}
