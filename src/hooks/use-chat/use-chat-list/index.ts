import { useQuery } from '@tanstack/react-query';

import { API } from '@/api';

export const useGetChatList = ({ userId }: { userId: number }) => {
  const query = useQuery({
    queryKey: ['chatList', userId],
    queryFn: () => API.chatService.getChatRooms(),
  });
  return query;
};
