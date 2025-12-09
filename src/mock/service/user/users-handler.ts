import { http, HttpResponse } from 'msw';

import { User } from '@/types/service/user';

import { createErrorResponse, createSuccessResponse } from '../common/common-mock';
import { mockUserItems } from './users-mock';

const getUserItemMock = http.get(`*/users/:userId`, ({ params }) => {
  const id = Number(params.userId);
  const user = mockUserItems.find((item) => item.id === id);

  if (!user) {
    return HttpResponse.json(
      createErrorResponse({ status: 404, detail: '존재하지 않는 유저입니다.', errorCode: 'U001' }),
      { status: 404 },
    );
  }

  return HttpResponse.json(createSuccessResponse(user));
});

const updateUserItemMock = http.patch(`*/users`, async ({ request }) => {
  const body = (await request.json()) as User;
  return HttpResponse.json(
    createSuccessResponse({
      ...mockUserItems[0],
      ...body,
    }),
  );
});

const deleteUserItemMock = http.delete(`*/users`, async () => {
  return HttpResponse.json(createSuccessResponse(null));
});

const followUserItemMock = http.post(`*/follows`, async () => {
  return HttpResponse.json(createSuccessResponse(null));
});

const unfollowUserItemMock = http.delete(`*/follows/:followId`, async () => {
  return HttpResponse.json(createSuccessResponse(null));
});

export const userHandlers = [
  getUserItemMock,
  updateUserItemMock,
  deleteUserItemMock,
  followUserItemMock,
  unfollowUserItemMock,
];
