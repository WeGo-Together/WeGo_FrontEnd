'use client';

import { useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';

import { API } from '@/api';
import { ChatList } from '@/components/pages/chat';
import { FollowingList, FollowingNone, FollowingSearch } from '@/components/pages/message';
import { TabNavigation } from '@/components/shared';
import { useInfiniteScroll } from '@/hooks/use-group/use-group-infinite-list';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { INTERSECTION_OBSERVER_THRESHOLD } from '@/lib/constants/group-list';

const SOCIAL_TABS = [
  { label: '팔로잉', value: 'following' },
  { label: '메세지', value: 'chat' },
];

export default function FollowingPage() {
  const [userId, setUserId] = useState(0);
  const params = useSearchParams();
  const tab = params.get('tab') || 'chat';

  useEffect(() => {
    const id = Cookies.get('userId');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserId(Number(id));
  }, []);

  // 1. 무한 스크롤 훅 호출
  const {
    items: followers,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    completedMessage,
  } = useInfiniteScroll({
    queryFn: async ({ cursor, size }) => {
      return await API.followerService.getFollowers({
        userId,
        cursor,
        size,
      });
    },
    queryKey: ['followers', userId],
    completedMessage: '모든 팔로잉을 불러왔습니다.',
    enabled: !!userId,
  });

  // 2. IntersectionObserver로 스크롤 감지
  const sentinelRef = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    enabled: hasNextPage && error === null,
    threshold: INTERSECTION_OBSERVER_THRESHOLD,
  });

  return (
    <div className='min-h-screen bg-[#F1F5F9]'>
      <TabNavigation basePath='/message' defaultValue='chat' tabs={SOCIAL_TABS} />

      {tab === 'chat' && <ChatList />}
      {tab === 'following' && (
        <>
          <FollowingSearch userId={userId} />
          {!error && followers && followers.length > 0 ? (
            <>
              <FollowingList items={followers} />

              {/* 3. Sentinel 요소 (필수!) */}
              {hasNextPage && <div ref={sentinelRef} className='h-1' />}

              {/* 4. 다음 페이지 로딩 중 */}
              {isFetchingNextPage && (
                <div className='flex items-center justify-center p-4'>
                  <span className='text-gray-500'>더 불러오는 중...</span>
                </div>
              )}

              {/* 5. 완료 메시지 */}
              {!hasNextPage && (
                <div className='flex items-center justify-center p-4'>
                  <span className='text-gray-500'>{completedMessage}</span>
                </div>
              )}
            </>
          ) : (
            !error && (
              <div className='flex flex-1 items-center justify-center'>
                <FollowingNone />
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}
