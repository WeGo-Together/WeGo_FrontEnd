import { api } from '@/api/core';
import {
  Availability,
  FollowPathParams,
  GetEmailAvailabilityQueryParams,
  GetNicknameAvailabilityQueryParams,
  GetUserPathParams,
  UnfollowQueryParams,
  UpdateMyImagePayload,
  UpdateMyInfoPayload,
  UpdateMyNotificationQueryParams,
  User,
} from '@/types/service/user';

export const userServiceRemote = () => ({
  // 1. 사용자 팔로우
  followUser: async (params: FollowPathParams) => {
    return api.post<void>(`/users/follow`, null, {
      params: { followNickname: params.followNickname },
    });
  },

  // 2. 유저 프로필 변경
  updateMyInfo: async (payload: UpdateMyInfoPayload) => {
    return api.patch<User>('/users/profile', payload);
  },

  // 3. 프로필 이미지 변경
  updateMyImage: async (payload: UpdateMyImagePayload) => {
    const formData = new FormData();
    formData.append('file', payload.file);
    return api.patch<User>(`/users/profile-image`, formData);
  },

  // 4. 알림 설정 변경
  updateMyNotification: async (params: UpdateMyNotificationQueryParams) => {
    return api.patch<User>(
      `/users/notification?isNotificationEnabled=${params.isNotificationEnabled}`,
    );
  },

  // 5. 유저 프로필 조회
  getUser: async (params: GetUserPathParams) => {
    return api.get<User>(`/users/${params.userId}`);
  },

  // 6. 닉네임 중복 검사
  getNicknameAvailability: async (params: GetNicknameAvailabilityQueryParams) => {
    return api.get<Availability>(`/users/nickname/availability`, {
      params: { nickname: params.nickName },
    });
  },

  // 7. 이메일 중복 검사
  getEmailAvailability: async (params: GetEmailAvailabilityQueryParams) => {
    return api.get<Availability>(`/users/email/availability`, {
      params: { email: params.email },
    });
  },

  // 8. 사용자 언팔로우
  unfollowUser: async (params: UnfollowQueryParams) => {
    return api.delete<void>(`/users/unfollow`, {
      params: { unFollowNickname: params.unFollowNickname },
    });
  },
});
