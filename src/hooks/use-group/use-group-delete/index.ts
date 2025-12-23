import { useMutation } from '@tanstack/react-query';

import { API } from '@/api';
import { GroupIdParams } from '@/types/service/group';

export const useDeleteGroup = (params: GroupIdParams, callback: () => void) => {
  const query = useMutation({
    mutationFn: () => API.groupService.deleteGroup(params),
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
