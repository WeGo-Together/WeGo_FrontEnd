'use client';

import { API } from '@/api';
import { useInfiniteScroll } from '@/hooks/use-group/use-group-infinite-list';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { GROUP_LIST_PAGE_SIZE, INTERSECTION_OBSERVER_THRESHOLD } from '@/lib/constants/group-list';
import { groupKeys } from '@/lib/query-key/query-key-group';
import { GroupListItemResponse } from '@/types/service/group';

import { Meetings } from '../meetings/index';

export default function History() {
  const queryKey = groupKeys.myGroupsList('past') as ['myGroups', 'past'];

  const {
    items,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    completedMessage,
    refetch,
  } = useInfiniteScroll<GroupListItemResponse, typeof queryKey>({
    queryFn: async ({ cursor, size }) => {
      return await API.groupService.getMyGroups({ type: 'past', cursor, size });
    },
    queryKey,
    pageSize: GROUP_LIST_PAGE_SIZE,
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
    <Meetings
      refetch={refetch}
      completedMessage={completedMessage}
      emptyStatePath='/'
      emptyStateType='past'
      error={error}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      meetings={items}
      sentinelRef={sentinelRef}
      showActions={false}
      tabType='past'
    />
  );
}
