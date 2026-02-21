import { cookies } from 'next/headers';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { FollowingContent } from '@/components/pages/message/message-following-content';
import { followKeys } from '@/lib/query-key/query-key-follow';

const INITIAL_PAGE_SIZE = 10;

const getQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1분
      },
    },
  });
};

export default async function MessagePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || null;
  const queryClient = getQueryClient();

  const me = await API.userService.getMe();
  const userId = me.userId;

  await Promise.all([
    // 팔로워 목록 prefetch
    queryClient.prefetchInfiniteQuery({
      queryKey: followKeys.followers(userId),
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
    }),

    // 채팅 목록 prefetch
    queryClient.prefetchQuery({
      queryKey: ['chatList', userId],
      queryFn: async () => {
        return await API.chatService.getChatRooms();
      },
    }),
  ]);

  // dehydrate로 직렬화
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <FollowingContent accessToken={accessToken} initialUserId={userId} />
    </HydrationBoundary>
  );
}
