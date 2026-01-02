import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';

export const useReadMessages = (roomId: number, userId: number) => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationKey: ['chatMessages', roomId],
    mutationFn: () => API.chatService.readMessages({ roomId }),
    onSuccess: () => {
      console.log('메세지를 읽었어요!');
      queryClient.invalidateQueries({
        queryKey: ['chatList', userId],
      });
    },
  });
  return query;
};
