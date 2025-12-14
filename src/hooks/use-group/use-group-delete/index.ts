import { useMutation } from '@tanstack/react-query';

import { API } from '@/api';
import { GroupIdPayload } from '@/types/service/group';

export const useDeleteGroup = (payload: GroupIdPayload, callback: () => void) => {
  const query = useMutation({
    mutationFn: () => API.groupService.deleteGroup(payload),
    onSuccess: async () => {
      console.log('모임 삭제 성공.');
      callback();
    },
    onError: () => {
      console.log('모임 삭제 실패.');
    },
  });
  return query;
};
