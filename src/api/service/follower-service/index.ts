import { api } from '@/api/core';
import { GetFollowerResponse } from '@/types/service/follow';

export const followerServiceRemote = () => ({
  // 팔로워 목록 조회
  getFollowers: async ({ userId }: { userId: number }) => {
    return api.get<GetFollowerResponse>(`/users/${userId}/follow`);
  },
});
