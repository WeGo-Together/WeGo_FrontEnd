import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { userKeys } from '@/lib/query-key/query-key-user';
import { Follow } from '@/types/service/user';

export const useUnfollowUser = (payload: Follow) => {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: () => API.usersService.unfollowUser(payload),
    onSuccess: (_data, _variables, _context) => {
      queryClient.invalidateQueries({ queryKey: userKeys.item(payload.followeeId) });
      console.log('요청 성공');
    },
    onError: () => {
      console.log('요청 실패');
    },
  });
  return query;
};
