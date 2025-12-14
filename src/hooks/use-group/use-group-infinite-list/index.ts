import { useMemo } from 'react';

import { InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { GROUP_LIST_PAGE_SIZE } from '@/lib/constants/group-list';
import { GetGroupsResponse, GroupListItemResponse } from '@/types/service/group';

type GroupInfiniteData = InfiniteData<GetGroupsResponse, number | undefined>;
type GroupQueryKey = ['groups', string | undefined];

const STALE_TIME = 3 * 1000; // 3초
const ERROR_MESSAGE = '모임 목록을 불러오는데 실패했습니다.';

interface UseInfiniteGroupListParams {
  initialData?: GroupInfiniteData;
  initialKeyword?: string;
}

interface UseInfiniteGroupListReturn {
  items: GroupListItemResponse[];
  nextCursor: number | null;
  error: Error | null;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isFetching: boolean;
  refetch: () => void;
}

/**
 * Cursor Pagination 기반 무한 스크롤 커스텀 훅
 * React Query의 useInfiniteQuery를 활용하여 자동 중복 호출 방지, 요청 상태 관리, 캐싱 처리
 */
export const useInfiniteGroupList = ({
  initialData,
  initialKeyword,
}: UseInfiniteGroupListParams): UseInfiniteGroupListReturn => {
  const queryClient = useQueryClient();
  const queryKey: GroupQueryKey = ['groups', initialKeyword];

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, refetch } =
    useInfiniteQuery<
      GetGroupsResponse,
      Error,
      GroupInfiniteData,
      GroupQueryKey,
      number | undefined
    >({
      queryKey,
      queryFn: async ({ pageParam }) => {
        // 다음 페이지 요청 시작 로그
        if (pageParam !== undefined) {
          const queryData = queryClient.getQueryData<GroupInfiniteData>(queryKey);
          const currentItemsCount = queryData?.pages.flatMap((page) => page.items).length ?? 0;

          console.log('다음 페이지 요청 시작', {
            '요청 크기': GROUP_LIST_PAGE_SIZE,
            '현재 커서': pageParam,
            '현재 누적 데이터 개수': currentItemsCount,
            키워드: initialKeyword || '없음',
          });
        }

        const response = await API.groupService.getGroups({
          keyword: initialKeyword,
          cursor: pageParam,
          size: GROUP_LIST_PAGE_SIZE,
        });

        // 다음 페이지 요청 완료 로그
        if (pageParam !== undefined) {
          const queryData = queryClient.getQueryData<GroupInfiniteData>(queryKey);
          const previousItemsCount = queryData?.pages.flatMap((page) => page.items).length ?? 0;
          const newItemsCount = previousItemsCount + response.items.length;

          console.log('다음 페이지 요청 완료', {
            '요청 크기': GROUP_LIST_PAGE_SIZE,
            '받은 데이터 개수': response.items.length,
            '이전 누적 데이터 개수': previousItemsCount,
            '새로운 누적 데이터 개수': newItemsCount,
            '다음 커서': response.nextCursor,
            키워드: initialKeyword || '없음',
          });

          if (response.nextCursor === null) {
            console.log('모든 데이터 로드 완료', {
              '총 데이터 개수': newItemsCount,
              키워드: initialKeyword || '없음',
            });
          }
        }

        return response;
      },
      initialPageParam: undefined,
      getNextPageParam: (lastPage: GetGroupsResponse) => {
        // nextCursor가 null이면 더 이상 요청하지 않음
        return lastPage.nextCursor ?? undefined;
      },
      initialData: initialData as GroupInfiniteData | undefined,
      staleTime: STALE_TIME,
    });

  // 여러 페이지의 아이템을 하나의 배열로 합치기
  const items = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page.items);
  }, [data]);

  // 마지막 페이지의 nextCursor 값
  const nextCursor = useMemo(() => {
    if (!data?.pages || data.pages.length === 0) return null;
    const lastPage = data.pages[data.pages.length - 1];
    return lastPage?.nextCursor ?? null;
  }, [data]);

  // 에러 객체 변환
  const errorObject = useMemo(() => {
    if (!error) return null;
    if (error instanceof Error) return error;
    return new Error(ERROR_MESSAGE);
  }, [error]);

  return {
    items,
    nextCursor,
    error: errorObject,
    fetchNextPage,
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    isFetching,
    refetch,
  };
};
