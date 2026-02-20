import { baseAPI } from '@/api/core/base';
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
    return baseAPI.post<string>(`/api/v1/users/follow`, null, {
      params: { followNickname: pathParams.followNickname },
    });
  },

  // 2. 유저 프로필 변경
  updateMyInfo: async (payloads: UpdateMyInfoPayloads) => {
    return baseAPI.patch<User>('/api/v1/users/profile', payloads);
  },

  // 3. 프로필 이미지 변경
  updateMyImage: async (payloads: UpdateMyImagePayloads) => {
    const formData = new FormData();
    formData.append('file', payloads.file);
    return baseAPI.patch<User>(`/api/v1/users/profile-image`, formData);
  },

  // 4. 알림 설정 변경
  updateMyNotification: async (queryParams: UpdateMyNotificationQueryParams) => {
    return baseAPI.patch<User>(`/api/v1/users/notification`, null, {
      params: { ...queryParams },
    });
  },

  // 5. 유저 프로필 조회
  getUser: async (pathParams: GetUserPathParams) => {
    return baseAPI.get<User>(`/api/v1/users/${pathParams.userId}`);
  },

  // 6. 팔로우 리스트 조회
  // getfollowUsers

  // 7. 닉네임 중복 검사
  getNicknameAvailability: async (queryParams: GetNicknameAvailabilityQueryParams) => {
    return baseAPI.get<Availability>(`/api/v1/users/nickname/availability`, {
      params: { nickname: queryParams.nickName },
    });
  },

  // 8. 본인 프로필 조회
  getMe: async () => {
    return baseAPI.get<User>(`/api/v1/users/me`);
  },

  // 8-1. 본인 프로필 조회(redirect skip)
  getMeSkipRedirect: async () => {
    return baseAPI.get<User>(`/api/v1/users/me`);
  },

  // 9. 이메일 중복 검사
  getEmailAvailability: async (queryParams: GetEmailAvailabilityQueryParams) => {
    return baseAPI.get<Availability>(`/api/v1/users/email/availability`, {
      params: { email: queryParams.email },
    });
  },

  // 10. 사용자 언팔로우
  unfollowUser: async (params: UnfollowQueryParams) => {
    return baseAPI.delete<string>(`/api/v1/users/unfollow`, {
      params: { unFollowNickname: params.unFollowNickname },
    });
  },
});
