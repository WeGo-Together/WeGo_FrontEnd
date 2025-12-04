import { baseAPI } from '@/api/core';
import { Follow, GetUserPayload, UpdateMePayload, User } from '@/types/service/user';

export const userServiceRemote = () => ({
  // 1. 사용자 단건 조회
  getUser: async (payload: GetUserPayload) => {
    try {
      const response = await baseAPI.get<User>(`/users/${payload.userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 2. 프로필 편집
  updateMe: async (payload: UpdateMePayload) => {
    try {
      const response = await baseAPI.patch<User>('/users', payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 3. 회원탈퇴
  deleteMe: async () => {
    try {
      const response = await baseAPI.delete(`/users`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // 4. 사용자 프로필 이미지 변경

  // 5. 사용자 팔로우
  followUser: async (payload: Follow) => {
    try {
      const response = await baseAPI.post(`/follows`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 6. 사용자 언팔로우
  unfollowUser: async (payload: Follow) => {
    try {
      const response = await baseAPI.delete(`/follows/${payload.followeeId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
});
