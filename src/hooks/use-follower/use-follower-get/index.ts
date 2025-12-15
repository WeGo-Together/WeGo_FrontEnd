import { useQuery } from '@tanstack/react-query';

import { API } from '@/api';

export const useGetFollowers = (
  { userId }: { userId: number },
  options?: { enabled?: boolean },
) => {
  const query = useQuery({
    queryKey: ['followers', userId],
    ...options,
    queryFn: () => API.followerService.getFollowers({ userId }),
  });
  return query;
};
