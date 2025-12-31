import { useMutation } from '@tanstack/react-query';

import { API } from '@/api';
import { CreateDMPayloads } from '@/types/service/chat';

export const useCreateDMChat = (userId: number) => {
  const query = useMutation({
    mutationKey: ['createDMChat', userId],
    mutationFn: (payloads: CreateDMPayloads) => API.chatService.createDMChatRoom(payloads),
  });
  return query;
};
