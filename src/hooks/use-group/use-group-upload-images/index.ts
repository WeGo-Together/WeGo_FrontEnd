import { useMutation } from '@tanstack/react-query';

import { API } from '@/api';
import { PreUploadGroupImagePayload } from '@/types/service/group';

export const useUploadGroupImages = () => {
  const query = useMutation({
    mutationFn: (payload: PreUploadGroupImagePayload) => {
      const formData = new FormData();

      payload.images.forEach((file) => {
        formData.append('images', file);
      });

      return API.groupService.uploadGroupImages(formData);
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
