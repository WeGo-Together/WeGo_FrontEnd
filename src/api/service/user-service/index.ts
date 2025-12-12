import { api } from '@/api/core';
import {
  FollowParams,
  GetUserParams,
  UpdateMePayload,
  UpdateMyImagePayload,
  UpdateMyNotiParams,
  User,
} from '@/types/service/user';

export const userServiceRemote = () => ({
  // 2. 프로필 편집
  updateMe: async (payload: UpdateMePayload) => {
    return api.patch<User>('/users', payload);
  },

  // 3. 프로필 이미지 편집
  updateMyImage: async (payload: UpdateMyImagePayload) => {
    return api.patch<User>(`/users/profile-image`, payload);
  },

  // 4. 알림 설정 변경
  updatMyNotification: async (payload: UpdateMyNotiParams) => {
    return api.patch<User>(`/users/notification/${payload.isNotificationEnabled}`);
  },

  // 5. 사용자 단건 조회
  getUser: async (payload: GetUserParams) => {
    return api.get<User>(`/users/${payload.userId}`);
  },

  // 1. 사용자 팔로우
  followUser: async (payload: FollowParams) => {
    return api.post<void>(`/follows/${payload.followNickname}`);
  },

  // 6. 사용자 언팔로우
  unfollowUser: async (payload: FollowParams) => {
    return api.delete<void>(`/follows/${payload.followNickname}`);
  },

  // 7. 회원탈퇴
  deleteMe: async () => api.delete<User>(`/users`),

  // 8. 사용자 프로필 이미지 변경
});
