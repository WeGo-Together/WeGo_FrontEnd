import { http, HttpResponse } from 'msw';

import { User } from '@/types/service/user';

import { createMockErrorResponse, createMockSuccessResponse } from '../common/common-mock';
import { mockUserItems } from './users-mock';

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

const updateUserItemMock = http.patch(`*/users`, async ({ request }) => {
  const body = (await request.json()) as User;
  return HttpResponse.json(
    createMockSuccessResponse({
      ...mockUserItems[0],
      ...body,
    }),
  );
});

const deleteUserItemMock = http.delete(`*/users`, async () => {
  return HttpResponse.json(createMockSuccessResponse(null));
});

const followUserItemMock = http.post(`*/follows`, async () => {
  return HttpResponse.json(createMockSuccessResponse(null));
});

const unfollowUserItemMock = http.delete(`*/follows/:followId`, async () => {
  return HttpResponse.json(createMockSuccessResponse(null));
});

export const userHandlers = [
  getUserItemMock,
  updateUserItemMock,
  deleteUserItemMock,
  followUserItemMock,
  unfollowUserItemMock,
];
