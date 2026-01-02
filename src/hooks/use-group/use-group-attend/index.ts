import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { groupKeys } from '@/lib/query-key/query-key-group';
import { AttendGroupPayload, GroupIdParams } from '@/types/service/group';

export const useAttendGroup = (params: GroupIdParams) => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (payload?: AttendGroupPayload) => API.groupService.attendGroup(params, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: groupKeys.detail(params.groupId) });
      console.log('모임 참여 성공.');
    },
    onError: () => {
      console.log('모임 참여 실패.');
    },
  });
  return query;
};
