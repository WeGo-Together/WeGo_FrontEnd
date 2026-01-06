import { http, HttpResponse } from 'msw';

import { createMockErrorResponse, createMockSuccessResponse } from '../common/common-mock';
import { mockFollowingItems } from './followers-mocks';

const getFollowersMock = http.get(`*/users/:userId/follow`, () => {
  if (!mockFollowingItems) {
    return HttpResponse.json(
      createMockErrorResponse({
        status: 404,
        detail: '팔로우가 없습니다.',
        errorCode: 'F001',
      }),
      { status: 404 },
    );
  }
  return HttpResponse.json(createMockSuccessResponse(mockFollowingItems));
});

const getFolloweesMock = http.get(`*/users/:userId/follower`, () => {
  if (!mockFollowingItems) {
    return HttpResponse.json(
      createMockErrorResponse({
        status: 404,
        detail: '팔로잉이 없습니다.',
        errorCode: 'F001',
      }),
      { status: 404 },
    );
  }
  return HttpResponse.json(createMockSuccessResponse(mockFollowingItems));
});

export const followerHandlers = [getFollowersMock, getFolloweesMock];
