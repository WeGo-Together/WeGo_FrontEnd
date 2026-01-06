import { api } from '@/api/core';
import { GetFollowParams, GetFollowResponse } from '@/types/service/follow';
import { FollowPathParams } from '@/types/service/user';

export const followerServiceRemote = () => ({
  // 팔로워 목록 조회
  getFollowers: async ({ userId, cursor, size = 20 }: GetFollowParams) => {
    return api.get<GetFollowResponse>(`/users/${userId}/follow`, {
      params: {
        cursor,
        size,
      },
    });
  },

  getFollowerList: async (params: GetFollowParams) => {
    const { userId, ...restParams } = params;
    return await api.get<GetFollowResponse>(`/users/${userId}/follower`, {
      params: { ...restParams },
    });
  },

  getFolloweeList: async (params: GetFollowParams) => {
    const { userId, ...restParams } = params;
    return await api.get<GetFollowResponse>(`/users/${userId}/follow`, {
      params: { ...restParams },
    });
  },

  // 팔로워 등록
  addFollower: async (params: FollowPathParams) => {
    return api.post<string>(`/users/follow`, null, {
      params: { followNickname: params.followNickname },
    });
  },
});
