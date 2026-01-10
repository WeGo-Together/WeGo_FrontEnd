import { useSuspenseQuery } from '@tanstack/react-query';

import { API } from '@/api';
import { groupKeys } from '@/lib/query-key/query-key-group';
import { GroupIdParams } from '@/types/service/group';

export const useGetGroupDetails = (params: GroupIdParams) => {
  const query = useSuspenseQuery({
    queryKey: groupKeys.detail(params.groupId),
    queryFn: () => API.groupService.getGroupDetails(params),
  });
  return query;
};
