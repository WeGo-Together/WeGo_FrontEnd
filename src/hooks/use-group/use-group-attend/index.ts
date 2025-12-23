import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { groupKeys } from '@/lib/query-key/query-key-group';
import { GroupIdParams } from '@/types/service/group';

export const useAttendGroup = (params: GroupIdParams, callback: () => void) => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: () => API.groupService.attendGroup(params),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: groupKeys.detail(params.groupId) });
      callback();
      console.log('모임 참여 성공.');
    },
    onError: () => {
      console.log('모임 참여 실패.');
    },
  });
  return query;
};
