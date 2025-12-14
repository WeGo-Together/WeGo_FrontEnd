import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { userKeys } from '@/lib/query-key/query-key-user';
import { FollowPathParams } from '@/types/service/user';

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: (params: FollowPathParams) => API.userService.followUser(params),
    onSuccess: (_data, _variables, _context) => {
      // todo: GetUser는 ID로 호출, follow는 nickname으로 진행 => querykey 타입 불일치로 인한 전체 querykey 삭제 적용 (임시)
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      console.log('요청 성공');
    },
    onError: () => {
      console.log('요청 실패');
    },
  });
  return query;
};
