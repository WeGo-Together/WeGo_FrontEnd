// 기본 팔로우 타입
export interface FollowItem {
  followId: number;
  userId: number;
  nickname: string;
  profileImage: string;
  profileMessage: string;
}

// 팔로우 목록 조회 응답
export interface GetFollowResponse {
  items: FollowItem[];
  nextCursor: number | null;
}

// 팔로우 목록 조회 Parameters
export interface GetFollowParams {
  userId: number;
  cursor?: number | null;
  size?: number;
}

// 팔로우 등록 Parameters
export interface AddFollowParams {
  followNickname: string;
}

// 팔로우 유형
export type FollowType = 'followers' | 'followees';
