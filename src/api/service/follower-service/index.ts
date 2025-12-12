import { api } from '@/api/core';
import { Follower } from '@/types/service/follow';

export const followerServiceRemote = () => ({
  // 팔로워 목록 조회
  // 임시주소로 작성. 나중에 수정 필요.
  getFollowers: async () => {
    return api.get<Follower[]>('/followers');
  },
});
