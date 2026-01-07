import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { followKeys } from '@/lib/query-key/query-key-follow';
import { userKeys } from '@/lib/query-key/query-key-user';
import { FollowPathParams } from '@/types/service/user';

export const useFollowUser = (userId: number) => {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: (params: FollowPathParams) => API.userService.followUser(params),
    onSuccess: (_data, _variables, _context) => {
      queryClient.invalidateQueries({ queryKey: userKeys.item(userId) });
      queryClient.invalidateQueries({ queryKey: followKeys.followers(userId) });
    },
    onError: () => {},
  });
  return query;
};
