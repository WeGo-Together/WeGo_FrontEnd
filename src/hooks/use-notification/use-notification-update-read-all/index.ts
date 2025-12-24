import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { notificationKeys } from '@/lib/query-key/query-key-notification';

export const useUpdateNotificationReadAll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => API.notificationService.updateReadAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
      queryClient.invalidateQueries({ queryKey: notificationKeys.unReadCount() });
    },
  });
};
