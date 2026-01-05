import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { KickUserPayloads } from '@/types/service/chat';

export const useKickUser = (roomId: number) => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationKey: ['participants', roomId],
    mutationFn: (payloads: KickUserPayloads) => API.chatService.kickUser(roomId, payloads),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['participants', roomId],
      });
    },
  });
  return query;
};
