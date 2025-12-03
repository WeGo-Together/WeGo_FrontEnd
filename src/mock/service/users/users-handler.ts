import { http, HttpResponse } from 'msw';

import { mockUserItem } from './users-mock';

const getUserItemMock = http.get(`http://localhost:4000/api/v1/users/:userId`, ({ params }) => {
  return HttpResponse.json({
    ...mockUserItem,
    id: Number(params.userId),
  });
});

export const usersHandlers = [getUserItemMock];
