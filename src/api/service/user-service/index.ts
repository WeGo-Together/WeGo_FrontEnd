import { api } from '@/api/core';
import {
  Availability,
  FollowParams,
  GetEmailAvailabilityParams,
  GetNickNameAvailabilityParams,
  GetUserParams,
  UnfollowParmams,
  UpdateMePayload,
  UpdateMyNotiParams,
  UpdateMyProfileImagePayload,
  User,
} from '@/types/service/user';

export const userServiceRemote = () => ({
  // 1. 사용자 팔로우
  followUser: async (params: FollowParams) => {
    return api.post<void>(`/users/follow?followNickname=${params.followNickname}`);
  },

  // 2. 유저 프로필 변경
  updateMe: async (payload: UpdateMePayload) => {
    return api.patch<User>('/users/profile', payload);
  },

  // 3. 프로필 이미지 변경
  updateMyProfileImage: async (payload: UpdateMyProfileImagePayload) => {
    const formData = new FormData();
    formData.append('file', payload.file);
    return api.patch<User>(`/users/profile-image`, formData);
  },

  // 4. 알림 설정 변경
  updateMyNotification: async (params: UpdateMyNotiParams) => {
    return api.patch<User>(
      `/users/notification?isNotificationEnabled=${params.isNotificationEnabled}`,
    );
  },

  // 5. 유저 프로필 조회
  getUser: async (payload: GetUserParams) => {
    return api.get<User>(`/users/${payload.userId}`);
  },

  // 6. 닉네임 중복 검사
  getNicknameAvailability: async (params: GetNickNameAvailabilityParams) => {
    return api.get<Availability>(`/users/nickname/availability?nickname=${params.nickName}`);
  },

  // 7. 이메일 중복 검사
  getEmailAvailability: async (params: GetEmailAvailabilityParams) => {
    return api.get<Availability>(`/users/email/availability?email=${params.email}`);
  },

  // 8. 사용자 언팔로우
  unfollowUser: async (params: UnfollowParmams) => {
    return api.delete<void>(`/users/unfollow?unFollowNickname=${params.unFollowNickname}`);
  },
});
