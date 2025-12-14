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
  isFollow: boolean;
}

export interface GetUserPathParams {
  userId: number;
}

export interface UpdateMyInfoPayloads {
  nickName?: string;
  mbti?: string;
  profileMessage?: string;
}

export interface UpdateMyImagePayloads {
  file: File;
}

export interface UpdateMyNotificationQueryParams {
  isNotificationEnabled: boolean;
}

export interface FollowPathParams {
  followNickname: string;
}

export interface UnfollowQueryParams {
  unFollowNickname: string;
}

export interface Availability {
  available: boolean;
}

export interface GetNicknameAvailabilityQueryParams {
  nickName: string;
}

export interface GetEmailAvailabilityQueryParams {
  email: string;
}
