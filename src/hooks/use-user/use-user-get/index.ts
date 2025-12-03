'use client';
import { useQuery } from '@tanstack/react-query';

import { API } from '@/api';
import { userKeys } from '@/lib/query-key/query-key-user';
import { GetUserPayload } from '@/types/service/user';

export const useGetUser = ({ userId }: GetUserPayload) => {
  const query = useQuery({
    queryKey: userKeys.item(userId),
    queryFn: () => API.usersService.getUser({ userId }),
  });
  return query;
};
