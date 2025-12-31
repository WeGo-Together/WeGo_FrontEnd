import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { userKeys } from '@/lib/query-key/query-key-user';
import { UpdateMyImagePayloads } from '@/types/service/user';

export const useUserImageUpdate = () => {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: (payload: UpdateMyImagePayloads) => API.userService.updateMyImage(payload),
    onSuccess: (_data, _variables, _context) => {
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
    onError: () => {},
  });
  return query;
};
