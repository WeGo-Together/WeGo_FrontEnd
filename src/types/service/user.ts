export interface User {
  userId: number;
  email: string;
  nickName: string;
  mbti: string;
  profileImage: string;
  profileMessage: string;
  followeesCnt: number;
  followersCnt: number;
  groupJoinedCnt: number;
  groupCreatedCnt: number;
  isNotificationEnabled: boolean;
  createdAt: string;
  isFollowing: boolean;
}

export interface GetUserPayload {
  userId: number;
}

export type GetUserResponse = User;

export interface UpdateMePayload {
  nickName?: string;
  profileImage?: string;
  mbti?: string;
  profileMessage?: string;
}

export type UpdateMeResponse = GetUserResponse;

export interface Follow {
  followeeId: number;
}
