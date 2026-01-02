import { useQuery } from '@tanstack/react-query';

import { API } from '@/api';

export const useGetChatRoom = (roomId: number) => {
  const query = useQuery({
    queryKey: ['chatRoom', roomId],
    queryFn: () => API.chatService.getChatRoom({ roomId }),
  });
  return query;
};
