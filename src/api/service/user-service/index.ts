import { api } from '@/api/core';
import { Follow, GetUserPayload, UpdateMePayload, User } from '@/types/service/user';

export const userServiceRemote = () => ({
  // 1. 사용자 단건 조회
  getUser: async (payload: GetUserPayload) => api.get<User>(`/users/${payload.userId}`),

  // 2. 프로필 편집
  updateMe: async (payload: UpdateMePayload) => api.patch<User>('/users', payload),

  // 3. 회원탈퇴
  deleteMe: async () => api.delete<User>(`/users`),
  // 4. 사용자 프로필 이미지 변경

  // 5. 사용자 팔로우
  followUser: async (payload: Follow) => api.post<void>(`/follows`, payload),

  // 6. 사용자 언팔로우
  unfollowUser: async (payload: Follow) => api.delete<void>(`/follows/${payload.followeeId}`),
});
