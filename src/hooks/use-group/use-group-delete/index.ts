import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { groupKeys } from '@/lib/query-key/query-key-group';
import { GroupIdParams } from '@/types/service/group';

export const useDeleteGroup = (params: GroupIdParams) => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: () => API.groupService.deleteGroup(params),
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: groupKeys.detail(params.groupId) });
      queryClient.invalidateQueries({ queryKey: groupKeys.lists() });
      queryClient.invalidateQueries({ queryKey: groupKeys.myGroups() });
      console.log('모임 삭제 성공.');
    },
    onError: () => {
      console.log('모임 삭제 실패.');
    },
  });
  return query;
};
