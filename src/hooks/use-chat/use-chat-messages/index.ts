import { useQuery } from '@tanstack/react-query';

import { API } from '@/api';

export const useGetChatMessages = (roomId: number, cursor?: number, size?: number) => {
  const query = useQuery({
    queryKey: ['chatMessages', roomId],
    queryFn: () => API.chatService.getChatMessages({ roomId, cursor, size }),
  });
  return query;
};
