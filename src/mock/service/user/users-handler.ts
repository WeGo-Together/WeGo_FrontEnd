import { http, HttpResponse } from 'msw';

import { User } from '@/types/service/user';

import { mockUserItems } from './users-mock';

const getUserItemMock = http.get(`*/api/v1/users/:userId`, ({ params }) => {
  const id = Number(params.userId);
  const user = mockUserItems.find((item) => item.id === id);

  if (!user) {
    return HttpResponse.json({ message: '존재하지 않는 유저입니다' }, { status: 404 });
  }

  return HttpResponse.json(user);
});

const updateUserItemMock = http.patch(`*/api/v1/users`, async ({ request }) => {
  const body = (await request.json()) as User;
  return HttpResponse.json({
    ...mockUserItems[0],
    ...body,
  });
});

const deleteUserItemMock = http.delete(`*/api/v1/users`, async () => {
  return new HttpResponse(null, { status: 204 });
});

const followUserItemMock = http.post(`*/api/v1/follows`, async () => {
  return new HttpResponse(null, { status: 204 });
});

const unfollowUserItemMock = http.delete(`*/api/v1/follows/:followId`, async () => {
  return new HttpResponse(null, { status: 204 });
});

export const userHandlers = [
  getUserItemMock,
  updateUserItemMock,
  deleteUserItemMock,
  followUserItemMock,
  unfollowUserItemMock,
];
