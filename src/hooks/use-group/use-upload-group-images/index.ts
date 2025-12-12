import { useMutation } from '@tanstack/react-query';

import { API } from '@/api';
import { PreUploadGroupImagePayload } from '@/types/service/group';

export const useUploadGroupImages = () => {
  const query = useMutation({
    mutationFn: (payload: PreUploadGroupImagePayload) =>
      API.groupService.uploadGroupImages(payload),
  });
  return query;
};
