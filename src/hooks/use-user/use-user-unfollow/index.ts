import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { userKeys } from '@/lib/query-key/query-key-user';
import { FollowParams } from '@/types/service/user';

export const useUnfollowUser = (payload: FollowParams) => {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: () => API.userService.unfollowUser(payload),
    onSuccess: (_data, _variables, _context) => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      console.log('요청 성공');
    },
    onError: () => {
      console.log('요청 실패');
    },
  });
  return query;
};
