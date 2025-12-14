import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { userKeys } from '@/lib/query-key/query-key-user';
import { UpdateMyImagePayload } from '@/types/service/user';

export const useUserImageUpdate = () => {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: (payload: UpdateMyImagePayload) => API.userService.updateMyImage(payload),
    onSuccess: (data, _variables, _context) => {
      queryClient.invalidateQueries({ queryKey: userKeys.item(data.userId) });
    },
    onError: () => {},
  });
  return query;
};
