import { useQuery } from '@tanstack/react-query';

import { API } from '@/api';

export const useGetParticipants = (roomId: number) => {
  const query = useQuery({
    queryKey: ['participants', roomId],
    queryFn: () => API.chatService.getParticipants({ roomId }),
  });
  return query;
};
