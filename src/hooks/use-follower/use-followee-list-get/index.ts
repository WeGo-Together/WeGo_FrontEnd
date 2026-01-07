import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { API } from '@/api';
import { followKeys } from '@/lib/query-key/query-key-follow';
import { GetFollowParams } from '@/types/service/follow';

export const useGetFolloweesInfinite = (params: GetFollowParams) => {
  return useSuspenseInfiniteQuery({
    queryFn: ({ pageParam }) =>
      API.followerService.getFolloweeList({ ...params, cursor: pageParam }),
    queryKey: followKeys.followees(params.userId),
    initialPageParam: params?.cursor,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: (data) => data.pages?.flatMap((page) => page.items) || [],
  });
};
