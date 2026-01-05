'use client';

import { API } from '@/api';
import { useInfiniteScroll } from '@/hooks/use-group/use-group-infinite-list';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { INTERSECTION_OBSERVER_THRESHOLD } from '@/lib/constants/group-list';
import { groupKeys } from '@/lib/query-key/query-key-group';
import { GroupListItemResponse } from '@/types/service/group';

import { Meetings } from './meetings';

export default function My() {
  const {
    items,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    completedMessage,
  } = useInfiniteScroll<GroupListItemResponse>({
    queryFn: async ({ cursor, size }) => {
      return await API.groupService.getMyGroups({
        type: 'myPost',
        cursor,
        size,
        filter: 'ALL',
      });
    },
    queryKey: groupKeys.myGroupsList('myPost') as ['myGroups', 'myPost'],
    pageSize: 10,
    errorMessage: '나의 모임 목록을 불러오는데 실패했습니다.',
    completedMessage: '모든 나의 모임을 불러왔습니다.',
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
      completedMessage={completedMessage}
      emptyStatePath='/create-group'
      emptyStateType='myPost'
      error={error}
      hasNextPage={hasNextPage}
      isLoading={isFetching && items.length === 0}
      meetings={items}
      sentinelRef={sentinelRef}
      showActions={true}
      tabType='myPost'
    />
  );
}
