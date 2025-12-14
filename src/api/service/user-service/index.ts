import { api } from '@/api/core';
import {
  Availability,
  FollowPathParams,
  GetEmailAvailabilityQueryParams,
  GetNicknameAvailabilityQueryParams,
  GetUserPathParams,
  UnfollowQueryParams,
  UpdateMyImagePayloads,
  UpdateMyInfoPayloads,
  UpdateMyNotificationQueryParams,
  User,
} from '@/types/service/user';

export const userServiceRemote = () => ({
  // 1. 사용자 팔로우
  followUser: async (pathParams: FollowPathParams) => {
    return api.post<string>(`/users/follow`, null, {
      params: { followNickname: pathParams.followNickname },
    });
  },

  // 2. 유저 프로필 변경
  updateMyInfo: async (payloads: UpdateMyInfoPayloads) => {
    return api.patch<User>('/users/profile', payloads);
  },

  // 3. 프로필 이미지 변경
  updateMyImage: async (payloads: UpdateMyImagePayloads) => {
    const formData = new FormData();
    formData.append('file', payloads.file);
    return api.patch<User>(`/users/profile-image`, formData);
  },

  // 4. 알림 설정 변경
  updateMyNotification: async (queryParams: UpdateMyNotificationQueryParams) => {
    return api.patch<User>(
      `/users/notification?isNotificationEnabled=${queryParams.isNotificationEnabled}`,
    );
  },

  // 5. 유저 프로필 조회
  getUser: async (pathParams: GetUserPathParams) => {
    return api.get<User>(`/users/${pathParams.userId}`);
  },

  // 6. 닉네임 중복 검사
  getNicknameAvailability: async (queryParams: GetNicknameAvailabilityQueryParams) => {
    return api.get<Availability>(`/users/nickname/availability`, {
      params: { nickname: queryParams.nickName },
    });
  },

  // 7. 이메일 중복 검사
  getEmailAvailability: async (queryParams: GetEmailAvailabilityQueryParams) => {
    return api.get<Availability>(`/users/email/availability`, {
      params: { email: queryParams.email },
    });
  },

  // 8. 사용자 언팔로우
  unfollowUser: async (params: UnfollowQueryParams) => {
    return api.delete<string>(`/users/unfollow`, {
      params: { unFollowNickname: params.unFollowNickname },
    });
  },
});
