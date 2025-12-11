import { useQuery } from '@tanstack/react-query';

import { API } from '@/api';
import { groupKeys } from '@/lib/query-key/query-key-group';
import { GetMyGroupsPayload } from '@/types/service/group';

export const useGetMyGroups = (payload: GetMyGroupsPayload) => {
  const query = useQuery({
    queryKey: groupKeys.myList(payload),
    queryFn: () => API.groupService.getMyGroups(payload),
  });
  return query;
};
