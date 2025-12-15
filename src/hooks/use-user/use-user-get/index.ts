import { useQuery } from '@tanstack/react-query';

import { API } from '@/api';
import { userKeys } from '@/lib/query-key/query-key-user';
import { GetUserPathParams } from '@/types/service/user';

export const useGetUser = ({ userId }: GetUserPathParams, options?: { enabled?: boolean }) => {
  const query = useQuery({
    queryKey: userKeys.item(userId),
    queryFn: () => API.userService.getUser({ userId }),
    ...options,
    select: (data) => ({
      ...data,
      profileImage: data.profileImage ?? '',
      profileMessage: data.profileMessage ?? '',
      mbti: data.mbti ?? '',
    }),
  });
  return query;
};
