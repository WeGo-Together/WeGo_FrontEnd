type NotificationType = 'FOLLOW' | 'ENTER' | 'EXIT' | 'CREATE' | 'CANCLE';

export interface Notification {
  id: string;
  receiverId: number;
  actorId: number;
  actorNickname: string;
  actorProfileImage: string;
  type: NotificationType;
  message: string;
  isRead: boolean;
  relatedId: number;
  relatedType: NotificationType;
  redirectUrl: string;
  createdAt: string;
}
