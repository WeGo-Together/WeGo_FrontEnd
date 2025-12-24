import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { notificationKeys } from '@/lib/query-key/query-key-notification';

export const useUpdateNotificationRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notificationId: number) => API.notificationService.updateRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
      queryClient.invalidateQueries({ queryKey: notificationKeys.unReadCount() });
    },
  });
};
