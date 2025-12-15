import { api } from '@/api/core';
import { Follower } from '@/types/service/follow';

export const followerServiceRemote = () => ({
  // 팔로워 목록 조회
  getFollowers: async ({ userId }: { userId: number }) => {
    return api.get<Follower[]>(`/${userId}/followers`);
  },
});
