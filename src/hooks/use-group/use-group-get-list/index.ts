import { useQuery } from '@tanstack/react-query';

import { API } from '@/api';
import { groupKeys } from '@/lib/query-key/query-key-group';
import { GetGroupsPayload } from '@/types/service/group';

export const useGetGroups = (payload: GetGroupsPayload) => {
  const query = useQuery({
    queryKey: groupKeys.list(payload),
    queryFn: () => API.groupService.getGroups(payload),
  });
  return query;
};
