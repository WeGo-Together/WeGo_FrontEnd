import { useMemo } from 'react';

import { InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { API } from '@/api';
import { GROUP_LIST_PAGE_SIZE } from '@/lib/constants/group-list';
import { GetGroupsResponse, GroupListItemResponse } from '@/types/service/group';

// 기본 타입 (그룹 목록용)
type GroupInfiniteData = InfiniteData<GetGroupsResponse, number | undefined>;
type GroupQueryKey = ['groups', string | undefined];

const STALE_TIME = 3 * 1000; // 3초
const DEFAULT_ERROR_MESSAGE = '데이터를 불러오는데 실패했습니다.';

// 범용 무한 스크롤 응답 타입 (다른 페이지에서도 사용 가능)
export interface InfiniteScrollResponse<T> {
  items: T[];
  nextCursor: number | null;
}

// 범용 무한 스크롤 파라미터 타입
export interface UseInfiniteScrollParams<TItem, TQueryKey extends unknown[] = unknown[]> {
  queryFn: (params: {
    cursor?: number;
    keyword?: string;
    size: number;
  }) => Promise<InfiniteScrollResponse<TItem>>;

  queryKey: TQueryKey;
  initialData?: InfiniteData<InfiniteScrollResponse<TItem>, number | undefined>;
  keyword?: string;
  pageSize?: number;
  staleTime?: number;
  errorMessage?: string;
  // 콘솔 로그 활성화 여부 (선택, 기본값: true)
  enableLogging?: boolean;
  // 모든 데이터 로드 완료 메시지 (선택, 기본값: "모든 데이터를 불러왔습니다.")
  completedMessage?: string;
}

// 범용 무한 스크롤 반환 타입
export interface UseInfiniteScrollReturn<TItem> {
  items: TItem[];
  nextCursor: number | null;
  error: Error | null;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isFetching: boolean;
  refetch: () => void;
  // 모든 데이터 로드 완료시 메시지
  completedMessage: string;
}

// 그룹 목록 전용 파라미터
interface UseInfiniteGroupListParams {
  initialData?: GroupInfiniteData;
  initialKeyword?: string;
}

// 그룹 목록 전용 반환 타입
interface UseInfiniteGroupListReturn {
  items: GroupListItemResponse[];
  nextCursor: number | null;
  error: Error | null;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isFetching: boolean;
  refetch: () => void;
  completedMessage: string;
}

/**
 * 범용 Cursor Pagination 기반 무한 스크롤 커스텀 훅
 * React Query의 useInfiniteQuery를 활용하여 자동 중복 호출 방지, 요청 상태 관리, 캐싱 처리
 * 다른 페이지에서도 재사용 가능한 상태입니당 (pr 참고)
 */
// eslint-disable-next-line func-style
export function useInfiniteScroll<TItem, TQueryKey extends unknown[] = unknown[]>({
  queryFn,
  queryKey,
  initialData,
  keyword,
  pageSize = 10,
  staleTime = STALE_TIME,
  errorMessage = DEFAULT_ERROR_MESSAGE,
  enableLogging = true,
  completedMessage = '모든 데이터를 불러왔습니다.',
}: UseInfiniteScrollParams<TItem, TQueryKey>): UseInfiniteScrollReturn<TItem> {
  const queryClient = useQueryClient();

  type InfiniteScrollData = InfiniteData<InfiniteScrollResponse<TItem>, number | undefined>;

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, refetch } =
    useInfiniteQuery<
      InfiniteScrollResponse<TItem>,
      Error,
      InfiniteScrollData,
      TQueryKey,
      number | undefined
    >({
      queryKey,
      queryFn: async ({ pageParam }) => {
        // 다음 페이지 요청 시작 로그
        if (pageParam !== undefined && enableLogging) {
          const queryData = queryClient.getQueryData<InfiniteScrollData>(queryKey);
          const currentItemsCount =
            queryData?.pages.flatMap((page: InfiniteScrollResponse<TItem>) => page.items).length ??
            0;

          console.log('다음 페이지 요청 시작', {
            '요청 크기': pageSize,
            '현재 커서': pageParam,
            '현재 누적 데이터 개수': currentItemsCount,
            키워드: keyword || '없음',
          });
        }

        const response = await queryFn({
          cursor: pageParam,
          keyword,
          size: pageSize,
        });

        // 다음 페이지 요청 완료 로그
        if (pageParam !== undefined && enableLogging) {
          const queryData = queryClient.getQueryData<InfiniteScrollData>(queryKey);
          const previousItemsCount =
            queryData?.pages.flatMap((page: InfiniteScrollResponse<TItem>) => page.items).length ??
            0;
          const newItemsCount = previousItemsCount + response.items.length;

          console.log('다음 페이지 요청 완료', {
            '요청 크기': pageSize,
            '받은 데이터 개수': response.items.length,
            '이전 누적 데이터 개수': previousItemsCount,
            '새로운 누적 데이터 개수': newItemsCount,
            '다음 커서': response.nextCursor,
            키워드: keyword || '없음',
          });

          if (response.nextCursor === null) {
            console.log('모든 데이터 로드 완료', {
              '총 데이터 개수': newItemsCount,
              키워드: keyword || '없음',
              메시지: completedMessage,
            });
          }
        }

        return response;
      },
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => {
        // nextCursor가 null이면 더 이상 요청하지 않음
        return lastPage.nextCursor ?? undefined;
      },
      initialData: initialData as InfiniteScrollData | undefined,
      staleTime,
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
    return new Error(errorMessage);
  }, [error, errorMessage]);

  return {
    items,
    nextCursor,
    error: errorObject,
    fetchNextPage,
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    isFetching,
    refetch,
    completedMessage,
  };
}

/**
 * 그룹 목록 전용 무한 스크롤 훅
 * 내부적으로 useInfiniteScroll을 사용
 */
export const useInfiniteGroupList = ({
  initialData,
  initialKeyword,
}: UseInfiniteGroupListParams): UseInfiniteGroupListReturn => {
  const queryKey: GroupQueryKey = ['groups', initialKeyword];

  return useInfiniteScroll<GroupListItemResponse, GroupQueryKey>({
    queryFn: async ({ cursor, keyword, size }) => {
      const response = await API.groupService.getGroups({
        keyword,
        cursor,
        size,
      });
      return response;
    },
    queryKey,
    initialData,
    keyword: initialKeyword,
    pageSize: GROUP_LIST_PAGE_SIZE,
    staleTime: STALE_TIME,
    errorMessage: '모임 목록을 불러오는데 실패했습니다.',
    enableLogging: true,
    completedMessage: '모든 모임을 불러왔습니다.',
  });
};
