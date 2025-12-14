import { useMutation } from '@tanstack/react-query';

import { API } from '@/api';
import { PreUploadGroupImagePayload } from '@/types/service/group';

export const useUploadGroupImages = () => {
  const query = useMutation({
    mutationFn: (payload: PreUploadGroupImagePayload) => {
      return API.groupService.uploadGroupImages(payload);
    },
    onSuccess: () => {
      console.log('이미지 등록 성공');
    },
    onError: () => {
      console.log('이미지 등록 실패');
    },
  });
  return query;
};
