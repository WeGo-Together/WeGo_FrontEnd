'use client';

import { API } from '@/api';
import { useInfiniteScroll } from '@/hooks/use-group/use-group-infinite-list';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { GROUP_LIST_PAGE_SIZE, INTERSECTION_OBSERVER_THRESHOLD } from '@/lib/constants/group-list';
import { groupKeys } from '@/lib/query-key/query-key-group';
import { GroupListItemResponse } from '@/types/service/group';

import { ScheduleList } from '../../schedule-list/index';

export const MyPost = () => {
  const queryKey = groupKeys.myGroupsList('myPost') as ['myGroups', 'myPost'];

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
      return await API.groupService.getMyGroups({
        type: 'myPost',
        cursor,
        size,
        filter: 'ACTIVE',
        excludeStatuses: ['CLOSED'],
      });
    },
    queryKey,
    pageSize: GROUP_LIST_PAGE_SIZE,
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
    <ScheduleList
      refetch={refetch}
      completedMessage={completedMessage}
      emptyStatePath='/create-group'
      emptyStateType='myPost'
      error={error}
      group={items}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      sentinelRef={sentinelRef}
      showActions={true}
      tabType='myPost'
    />
  );
};
