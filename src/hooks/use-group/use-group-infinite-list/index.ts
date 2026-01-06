import { useMemo } from 'react';

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

const STALE_TIME = 3 * 1000; // 3초
const DEFAULT_ERROR_MESSAGE = '데이터를 불러오는데 실패했습니다.';

// 범용 무한 스크롤 응답 타입 (다른 페이지에서도 사용 가능)
export interface InfiniteScrollResponse<T> {
  items: T[];
  nextCursor: number | null;
}

// 범용 무한 스크롤 파라미터 타입
export interface UseInfiniteScrollParams<
  TItem,
  TQueryKey extends readonly unknown[] = readonly unknown[],
> {
  queryFn: (params: {
    cursor?: number;
    keyword?: string;
    size: number;
  }) => Promise<InfiniteScrollResponse<TItem>>;

  queryKey: TQueryKey;
  keyword?: string;
  pageSize?: number;
  staleTime?: number;
  errorMessage?: string;
  // 모든 데이터 로드 완료 메시지 (선택, 기본값: "모든 데이터를 불러왔습니다.")
  completedMessage?: string;
  enabled?: boolean;
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
  isLoading: boolean;
  refetch: () => void;
  // 모든 데이터 로드 완료시 메시지
  completedMessage: string;
}

// eslint-disable-next-line func-style
export function useInfiniteScroll<
  TItem,
  TQueryKey extends readonly unknown[] = readonly unknown[],
>({
  queryFn,
  queryKey,
  keyword,
  pageSize = 10,
  staleTime = STALE_TIME,
  errorMessage = DEFAULT_ERROR_MESSAGE,
  enabled = true,
  completedMessage = '모든 데이터를 불러왔습니다.',
}: UseInfiniteScrollParams<TItem, TQueryKey>): UseInfiniteScrollReturn<TItem> {
  type InfiniteScrollData = InfiniteData<InfiniteScrollResponse<TItem>, number | undefined>;

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
    refetch,
  } = useInfiniteQuery<
    InfiniteScrollResponse<TItem>,
    Error,
    InfiniteScrollData,
    TQueryKey,
    number | undefined
  >({
    queryKey,
    enabled,
    queryFn: async ({ pageParam }) => {
      const response = await queryFn({
        cursor: pageParam,
        keyword,
        size: pageSize,
      });

      return response;
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined;
    },
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
    isLoading,
    refetch,
    completedMessage,
  };
}
