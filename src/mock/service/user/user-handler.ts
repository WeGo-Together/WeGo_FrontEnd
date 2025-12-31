import { http, HttpResponse } from 'msw';

import { User } from '@/types/service/user';

import { createMockErrorResponse, createMockSuccessResponse } from '../common/common-mock';
import { mockUserItems } from './user-mock';

// 1. 팔로우 등록 모킹
const followUserMock = http.post(`*/users/follow`, async ({ request }) => {
  const url = new URL(request.url);
  const followNickname = url.searchParams.get('followNickname');
  const user = mockUserItems.find((v) => v.nickName === followNickname);

  if (user?.isFollow === false) {
    return HttpResponse.json(createMockSuccessResponse('팔로우 성공'));
  }

  if (user?.isFollow === null) {
    return HttpResponse.json(
      createMockErrorResponse({
        status: 400,
        detail: '회원 : 자기 자신을 팔로우할 수 없습니다.',
        errorCode: 'NOT_SAME_FOLLOW',
      }),
    );
  }

  if (user?.isFollow === true) {
    return HttpResponse.json(
      createMockErrorResponse({
        status: 400,
        detail: '회원 : 이미 팔로우 중입니다.',
        errorCode: 'ALREADY_EXIST_FOLLOW',
      }),
    );
  }
});

// 2. 유저 프로필 변경 모킹
const updateUserItemMock = http.patch(`*/users/profile`, async ({ request }) => {
  const body = (await request.json()) as User;
  return HttpResponse.json(
    createMockSuccessResponse({
      ...mockUserItems[0],
      ...body,
    }),
  );
});

// 4. 알림 설정 변경 모킹
const updateMyNotificationMock = http.patch(`*/users/notification`, async ({ request }) => {
  const url = new URL(request.url);
  const isNotificationEnabled = url.searchParams.get('isNotificationEnabled');

  return HttpResponse.json(
    createMockSuccessResponse({
      ...mockUserItems[0],
      isNotificationEnabled: !!isNotificationEnabled,
    }),
  );
});

// 5. 유저 프로필 조회 모킹
const getUserItemMock = http.get(`*/users/:userId`, ({ params }) => {
  const id = Number(params.userId);
  const user = mockUserItems.find((item) => item.userId === id);

  if (!user) {
    return HttpResponse.json(
      createMockErrorResponse({
        status: 404,
        detail: '존재하지 않는 유저입니다.',
        errorCode: 'U001',
      }),
      { status: 404 },
    );
  }

  return HttpResponse.json(createMockSuccessResponse(user));
});

// 7. 닉네임 중복 검사 모킹
const getNicknameAvailabilityMock = http.get(`*/users/nickname/availability`, ({ request }) => {
  const url = new URL(request.url);
  const nickname = url.searchParams.get('nickname');
  const user = mockUserItems.find((item) => item.nickName === nickname);
  return HttpResponse.json(
    createMockSuccessResponse({
      data: { available: !user },
    }),
  );
});

// 8. 본인 프로필 조회 모킹
const getMeItemMock = http.get(`*/users/me`, () => {
  const id = 1;
  const user = mockUserItems.find((item) => item.userId === id);
  return HttpResponse.json(createMockSuccessResponse(user));
});

// 7. 닉네임 중복 검사 모킹
const getEmailAvailabilityMock = http.get(`*/users/email/availability`, ({ request }) => {
  const url = new URL(request.url);
  const email = url.searchParams.get('email');
  const user = mockUserItems.find((item) => item.email === email);
  return HttpResponse.json(
    createMockSuccessResponse({
      data: { available: !user },
    }),
  );
});

const unfollowUserMock = http.delete(`*/users/unfollow`, ({ request }) => {
  const url = new URL(request.url);
  const unFollowNickname = url.searchParams.get('unFollowNickname');
  const user = mockUserItems.find((v) => v.nickName === unFollowNickname);

  if (user?.isFollow === false) {
    return HttpResponse.json(createMockSuccessResponse('팔로우 취소 성공'));
  }

  if (user?.isFollow === null) {
    return HttpResponse.json(
      createMockErrorResponse({
        status: 400,
        detail: '회원 : 팔로우 취소 대상은 본인 될 수 없습니다.',
        errorCode: 'NOT_SAME_FOLLOW',
      }),
    );
  }

  if (user?.isFollow === true) {
    return HttpResponse.json(
      createMockErrorResponse({
        status: 400,
        detail: '회원 : 팔로우 관계를 찾을 수 없습니다.',
        errorCode: 'NOT_FOUND_FOLLOW',
      }),
    );
  }
});

export const userHandlers = [
  followUserMock,
  getMeItemMock,
  getUserItemMock,
  updateMyNotificationMock,
  updateUserItemMock,
  getNicknameAvailabilityMock,
  getEmailAvailabilityMock,
  unfollowUserMock,
];
