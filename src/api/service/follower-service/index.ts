import { baseAPI } from '@/api/core';

export const followerServiceRemote = () => ({
  // 팔로워 목록 조회
  // 임시주소로 작성. 나중에 수정 필요.
  getFollowers: async () => {
    try {
      const response = await baseAPI.get('http://localhost:4000/followers');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
});
