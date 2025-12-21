import { useQuery } from '@tanstack/react-query';

import { API } from '@/api';
import { userKeys } from '@/lib/query-key/query-key-user';

export const useGetMe = () => {
  const query = useQuery({
    queryKey: userKeys.me(),
    queryFn: () => API.userService.getMe(),
    select: (data) => ({
      ...data,
      profileImage: data.profileImage ?? '',
      profileMessage: data.profileMessage ?? '',
      mbti: data.mbti ?? '',
    }),
  });
  return query;
};
