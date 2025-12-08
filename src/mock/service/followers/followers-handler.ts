import { http, HttpResponse } from 'msw';

import { mockFollowingItems } from './followers-mocks';

const getFollowersMock = http.get('http://localhost:4000/followers', () => {
  if (!mockFollowingItems) {
    return HttpResponse.json({ message: '팔로잉 목록이 없습니다.' }, { status: 404 });
  }
  return HttpResponse.json(mockFollowingItems);
});

export const followerHandlers = [getFollowersMock];
