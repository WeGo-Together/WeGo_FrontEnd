'use client';

import { API } from '@/api';
import { useInfiniteScroll } from '@/hooks/use-group/use-group-infinite-list';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { INTERSECTION_OBSERVER_THRESHOLD } from '@/lib/constants/group-list';
import { GroupListItemResponse } from '@/types/service/group';

import { MeetingList } from './meeting-list';

export default function History() {
  const { items, error, fetchNextPage, hasNextPage, isFetchingNextPage, completedMessage } =
    useInfiniteScroll<GroupListItemResponse, ['myGroups', 'past']>({
      queryFn: async ({ cursor, size }) => {
        return await API.groupService.getMyGroups({
          type: 'past',
          cursor,
          size,
          filter: 'ALL',
        });
      },
      queryKey: ['myGroups', 'past'],
      pageSize: 10,
      errorMessage: '모임 이력을 불러오는데 실패했습니다.',
      completedMessage: '모든 모임 이력을 불러왔습니다.',
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
      emptyStateType='past'
      error={error}
      hasNextPage={hasNextPage}
      meetings={items}
      sentinelRef={sentinelRef}
      showActions={false}
      tabType='past'
    />
  );
}
