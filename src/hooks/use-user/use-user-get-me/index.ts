import { useQuery } from '@tanstack/react-query';

import { API } from '@/api';
import { userKeys } from '@/lib/query-key/query-key-user';

export const useUserGetMe = () => {
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

export const useUserGetMeSkipRedirect = () => {
  const query = useQuery({
    queryKey: userKeys.me(),
    queryFn: () => API.userService.getMeSkipRedirect(),
    select: (data) => ({
      ...data,
      profileImage: data.profileImage ?? '',
      profileMessage: data.profileMessage ?? '',
      mbti: data.mbti ?? '',
    }),
  });
  return query;
};
