import { useMutation } from '@tanstack/react-query';

import { API } from '@/api';
import { CreateGroupPayload } from '@/types/service/group';

export const useCreateGroup = () => {
  const query = useMutation({
    mutationFn: (payload: CreateGroupPayload) => API.groupService.createGroup(payload),
    onSuccess: () => {
      // 상세 페이지 이동할거라 목록 캐시를 갱신할 이유가 없음 (GPT 피셜)
      console.log('모임 생성 성공.');
    },
    onError: () => {
      console.log('모임 생성 실패.');
    },
  });
  return query;
};
