import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { groupKeys } from '@/lib/query-key/query-key-group';
import { CreateGroupPayload, GroupIdParams } from '@/types/service/group';

export const useEditGroup = (params: GroupIdParams) => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (payload: CreateGroupPayload) => API.groupService.editGroup(params, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: groupKeys.detail(params.groupId) });

      console.log('모임 수정 성공.');
    },
    onError: () => {
      console.log('모임 수정 실패.');
    },
  });
  return query;
};
