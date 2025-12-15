// 기본 팔로우 타입
export interface Follower {
  followId: number;
  userId: number;
  nickname: string;
  profileImage: string;
  profileMessage: string;
}

// 팔로우 목록 조회 응답
export interface GetFollowerResponse {
  items: Follower[];
  nextCursor: number | null;
}

// 팔로우 등록 Parameters
export interface AddFollowParams {
  followNickname: string;
}
