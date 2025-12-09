import { useQuery } from '@tanstack/react-query';

import { API } from '@/api';

export const useGetFollowers = () => {
  const query = useQuery({
    queryKey: ['followers'],
    queryFn: () => API.followerService.getFollowers(),
  });
  return query;
};
