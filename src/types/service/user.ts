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

export interface GetUserParams {
  userId: number;
}

export interface UpdateMePayload {
  nickName?: string;
  mbti?: string;
  profileMessage?: string;
}

export interface UpdateMyProfileImagePayload {
  file: File;
}

export interface UpdateMyNotiParams {
  isNotificationEnabled: boolean;
}

export interface FollowParams {
  followNickname: string;
}

export interface Availability {
  available: boolean;
}

export interface GetNickNameAvailabilityParams {
  nickName: string;
}

export interface GetEmailAvailabilityParams {
  email: string;
}
