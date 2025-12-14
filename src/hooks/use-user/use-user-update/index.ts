import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { userKeys } from '@/lib/query-key/query-key-user';
import { UpdateMyInfoPayload } from '@/types/service/user';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: (payload: UpdateMyInfoPayload) => API.userService.updateMyInfo(payload),
    onSuccess: (data, _variables, _context) => {
      queryClient.invalidateQueries({ queryKey: userKeys.item(data.userId) });
    },
    onError: () => {},
  });
  return query;
};
