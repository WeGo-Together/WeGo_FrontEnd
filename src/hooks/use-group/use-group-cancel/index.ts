import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { groupKeys } from '@/lib/query-key/query-key-group';
import { GroupIdPayload } from '@/types/service/group';

export const useCancelGroup = (payload: GroupIdPayload, callback: () => void) => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: () => API.groupService.cancelGroup(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: groupKeys.detail(payload.groupId) });
      callback();
      console.log('모임 탈퇴 성공.');
    },
    onError: () => {
      console.log('모임 탈퇴 실패.');
    },
  });
  return query;
};
