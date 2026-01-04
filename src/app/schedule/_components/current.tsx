'use client';

import { API } from '@/api';
import { useInfiniteScroll } from '@/hooks/use-group/use-group-infinite-list';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { INTERSECTION_OBSERVER_THRESHOLD } from '@/lib/constants/group-list';
import { GroupListItemResponse } from '@/types/service/group';

import { MeetingList } from './meeting-list';

export default function Current() {
  const {
    items,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    completedMessage,
  } = useInfiniteScroll<GroupListItemResponse, ['myGroups', 'current']>({
    queryFn: async ({ cursor, size }) => {
      return await API.groupService.getMyGroups({
        type: 'current',
        cursor,
        size,
        myStatuses: ['ATTEND', 'PENDING'],
      });
    },
    queryKey: ['myGroups', 'current'],
    pageSize: 10,
    errorMessage: '현재 모임 목록을 불러오는데 실패했습니다.',
    completedMessage: '모든 현재 모임을 불러왔습니다.',
  });

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
    <MeetingList
      completedMessage={completedMessage}
      emptyStatePath='/'
      emptyStateType='current'
      error={error}
      hasNextPage={hasNextPage}
      isLoading={isFetching && items.length === 0}
      meetings={items}
      sentinelRef={sentinelRef}
      showActions={true}
      tabType='current'
    />
  );
}
