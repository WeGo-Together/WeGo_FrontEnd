import { useQuery } from '@tanstack/react-query';

import { API } from '@/api';
import { GetGroupDetailsPayload } from '@/types/service/group';

export const useGetGroupDetails = (payload: GetGroupDetailsPayload) => {
  const query = useQuery({
    queryKey: ['somekey'],
    queryFn: () => API.groupService.getGroupDetails(payload),
  });
  return query;
};
