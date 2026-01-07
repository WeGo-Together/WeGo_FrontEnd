import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { followKeys } from '@/lib/query-key/query-key-follow';
import { userKeys } from '@/lib/query-key/query-key-user';
import { UnfollowQueryParams } from '@/types/service/user';

export const useUnfollowUser = (userId: number) => {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: (params: UnfollowQueryParams) => API.userService.unfollowUser(params),
    onSuccess: (_data, _variables, _context) => {
      queryClient.invalidateQueries({ queryKey: userKeys.item(userId) });
      queryClient.invalidateQueries({ queryKey: followKeys.followers(userId) });
    },
    onError: () => {},
  });
  return query;
};
