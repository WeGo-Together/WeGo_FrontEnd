import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { groupKeys } from '@/lib/query-key/query-key-group';
import { KickGroupMemberParams } from '@/types/service/group';

export const useKickGroupMember = (params: KickGroupMemberParams) => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: () => API.groupService.kickGroupMember(params),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: groupKeys.detail(params.groupId) });
      console.log('강퇴 성공.');
    },
    onError: () => {
      console.log('강퇴 실패.');
    },
  });
  return query;
};
