export interface User {
  id: number;
  email: string;
  nickName: string;
  profileImage: string;
  notification_enabled: boolean;
  mbti: string;
  phoneNumber: string; // 삭제
  profileMessage: string;
  // 아래는 추가되어야 할 것들
  followeesCount: number;
  followersCount: number;
  createdAt: string;
  joinedCount: number;
  createdCount: number;
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

export interface Follow {
  followeeId: number;
}
