import { useQuery } from '@tanstack/react-query';

import { API } from '@/api';
import { groupKeys } from '@/lib/query-key/query-key-group';
import { GetGroupDetailsPayload } from '@/types/service/group';

export const useGetGroupDetails = (payload: GetGroupDetailsPayload) => {
  const query = useQuery({
    queryKey: groupKeys.detail(payload.groupId),
    queryFn: () => API.groupService.getGroupDetails(payload),
  });
  return query;
};
