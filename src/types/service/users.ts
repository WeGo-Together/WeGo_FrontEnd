export interface User {
  id: number;
  email: string;
  nickName: string;
  profileImage: string;
  notification_enabled: string;
  mbti: string;
  phoneNumber: string;
  profileMessage: string;
}

export interface GetUserPayload {
  userId: number;
}

export type GetUserResponse = User;

export interface UpdateMePayload {
  nickName?: string;
  profileImage?: string;
  mbti?: string;
  phoneNumber?: string;
  profileMessage?: string;
}

export type UpdateMeResponse = GetUserResponse;
