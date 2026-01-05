import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { AddFollowParams } from '@/types/service/follow';

export const useAddFollowers = (
  { userId }: { userId: number },
  options?: { enabled?: boolean },
) => {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: (params: AddFollowParams) => API.followerService.addFollower(params),
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followers', userId] });
    },
    onError: (error) => {
      throw error;
    },
  });
  return query;
};
