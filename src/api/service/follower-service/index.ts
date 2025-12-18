import { api } from '@/api/core';
import { GetFollowerParams, GetFollowerResponse } from '@/types/service/follow';
import { FollowPathParams } from '@/types/service/user';

export const followerServiceRemote = () => ({
  // 팔로워 목록 조회
  getFollowers: async ({ userId, cursor, size = 20 }: GetFollowerParams) => {
    return api.get<GetFollowerResponse>(`/users/${userId}/follow`, {
      params: {
        cursor,
        size,
      },
    });
  },

  // 팔로워 등록
  addFollower: async (params: FollowPathParams) => {
    return api.post<string>(`/users/follow`, null, {
      params: { followNickname: params.followNickname },
    });
  },
});
