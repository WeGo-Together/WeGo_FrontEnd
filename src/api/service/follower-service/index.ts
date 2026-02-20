import { baseAPI } from '@/api/core/base';
import { GetFollowParams, GetFollowResponse } from '@/types/service/follow';
import { FollowPathParams } from '@/types/service/user';

export const followerServiceRemote = () => ({
  // 팔로워 목록 조회
  getFollowers: async ({ userId, cursor, size = 20 }: GetFollowParams) => {
    return baseAPI.get<GetFollowResponse>(`/api/v1/users/${userId}/follow`, {
      params: {
        cursor,
        size,
      },
    });
  },

  getFollowerList: async (params: GetFollowParams) => {
    const { userId, ...restParams } = params;
    return await baseAPI.get<GetFollowResponse>(`/api/v1/users/${userId}/follower`, {
      params: { ...restParams },
    });
  },

  getFolloweeList: async (params: GetFollowParams) => {
    const { userId, ...restParams } = params;
    return await baseAPI.get<GetFollowResponse>(`/api/v1/users/${userId}/follow`, {
      params: { ...restParams },
    });
  },

  // 팔로워 등록
  addFollower: async (params: FollowPathParams) => {
    return baseAPI.post<string>(`/api/v1/users/follow`, null, {
      params: { followNickname: params.followNickname },
    });
  },
});
