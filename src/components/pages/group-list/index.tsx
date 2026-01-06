'use client';

import { useSearchParams } from 'next/navigation';

import { API } from '@/api';
import { ErrorMessage } from '@/components/shared';
import { useInfiniteScroll } from '@/hooks/use-group/use-group-infinite-list';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import {
  GROUP_LIST_MIN_HEIGHT,
  GROUP_LIST_PAGE_SIZE,
  INTERSECTION_OBSERVER_THRESHOLD,
} from '@/lib/constants/group-list';
import { groupKeys } from '@/lib/query-key/query-key-group';
import { GroupListItemResponse } from '@/types/service/group';

import { GroupListContent } from './group-list-content';
import { GroupListEmpty } from './group-list-empty';
import { GroupListInfiniteScroll } from './group-list-infinite-scroll';
import { GroupListLoading } from './group-list-loading';
import { GroupListSearchEmpty } from './group-list-search-empty';

const SearchResultCount = ({ keyword, count }: { keyword: string; count: number }) => (
  <div className='mt-4 flex h-5 items-center pl-2'>
    <span className='text-text-sm-medium text-mint-600'>{keyword}</span>
    <span className='text-text-sm-medium ml-1 text-gray-800'>검색결과</span>
    <span className='text-text-sm-medium text-mint-600 ml-1'>{count}</span>
    <span className='text-text-sm-medium text-gray-800'>개</span>
  </div>
);

export default function GroupList() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || undefined;

  const queryKey = groupKeys.list({ keyword, size: GROUP_LIST_PAGE_SIZE }) as [
    'group',
    'list',
    { keyword?: string; cursor?: number; size: number },
  ];

  const {
    items,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
    completedMessage,
    refetch,
  } = useInfiniteScroll<GroupListItemResponse, typeof queryKey>({
    queryFn: async ({ cursor, keyword, size }) => {
      const response = await API.groupService.getGroups({
        keyword,
        cursor,
        size,
      });
      return response;
    },
    queryKey,
    keyword,
    pageSize: GROUP_LIST_PAGE_SIZE,
    errorMessage: '모임 목록을 불러오는데 실패했습니다.',
    completedMessage: '모든 모임을 불러왔습니다.',
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

  const hasKeyword = Boolean(keyword);
  const hasNoItems = items.length === 0 && !error && !isFetching;
  const hasError = !!error;
  const hasItems = items.length > 0;

  if (isLoading) {
    return <GroupListLoading />;
  }

  return (
    <section className={`${GROUP_LIST_MIN_HEIGHT} bg-[#F1F5F9]`}>
      <div className='flex w-full flex-col px-4'>
        {hasError && !hasItems && (
          <div className='py-4'>
            <ErrorMessage className='py-12' message={error.message} onRetry={() => refetch()} />
          </div>
        )}

        {hasKeyword && keyword && <SearchResultCount keyword={keyword} count={items.length} />}

        {!hasKeyword && hasNoItems && <GroupListEmpty />}

        {hasKeyword && hasNoItems && <GroupListSearchEmpty />}

        {hasItems && <GroupListContent keyword={keyword} items={items} />}

        {hasError && hasItems && (
          <div className='py-4'>
            <ErrorMessage className='py-8' message={error.message} onRetry={() => refetch()} />
          </div>
        )}

        {hasItems && (
          <GroupListInfiniteScroll
            completedMessage={completedMessage}
            hasError={hasError}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            sentinelRef={sentinelRef}
          />
        )}
      </div>
    </section>
  );
}
