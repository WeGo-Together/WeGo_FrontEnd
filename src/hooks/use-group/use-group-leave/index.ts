import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { groupKeys } from '@/lib/query-key/query-key-group';
import { GroupIdParams } from '@/types/service/group';

export const useLeaveGroup = (params: GroupIdParams, callback: () => void) => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: () => API.groupService.leaveGroup(params),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: groupKeys.detail(params.groupId) });
      callback();
      console.log('모임 탈퇴 성공.');
    },
    onError: () => {
      console.log('모임 탈퇴 실패.');
    },
  });
  return query;
};
