import { useMutation } from '@tanstack/react-query';

import { API } from '@/api';
import { CreateGroupPayload } from '@/types/service/group';

export const useCreateGroup = () => {
  const query = useMutation({
    mutationFn: (payload: CreateGroupPayload) => API.groupService.createGroup(payload),
    onSuccess: async () => {
      console.log('모임 생성 성공.');
    },
    onError: () => {
      console.log('모임 생성 실패.');
    },
  });
  return query;
};
