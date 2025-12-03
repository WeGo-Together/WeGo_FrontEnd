import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { userKeys } from '@/lib/query-key/query-key-user';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: () => API.usersService.deleteMe(),
    onSuccess: (data, _variables, _context) => {
      queryClient.invalidateQueries({ queryKey: userKeys.item(data.id) });
      console.log('요청 성공');
    },
    onError: () => {
      console.log('요청 실패');
    },
  });
  return query;
};
