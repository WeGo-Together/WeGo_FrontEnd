import { cookies } from 'next/headers';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { FollowingContent } from '@/components/pages/message/message-following-content';

const INITIAL_PAGE_SIZE = 10;

export default async function MessagePage() {
  const cookieStore = await cookies();
  const userId = Number(cookieStore.get('userId')?.value || 0);
  const accessToken = cookieStore.get('accessToken')?.value || null;
  const queryClient = new QueryClient();

  // 첫 페이지 우선 prefetch
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['followers', userId],
    queryFn: async () => {
      return await API.followerService.getFollowers({
        userId,
        cursor: undefined,
        size: INITIAL_PAGE_SIZE,
      });
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined;
    },
    pages: 1,
  });

  // dehydrate로 직렬화
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <FollowingContent accessToken={accessToken} initialUserId={userId} />
    </HydrationBoundary>
  );
}
