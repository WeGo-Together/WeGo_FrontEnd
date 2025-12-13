import { useCallback, useEffect, useRef, useState } from 'react';

import { API } from '@/api';
import { GROUP_LIST_PAGE_SIZE } from '@/lib/constants/group-list';
import { GroupListItemResponse } from '@/types/service/group';

interface UseInfiniteGroupListParams {
  initialCursor: number | null;
  initialItems: GroupListItemResponse[];
  initialKeyword?: string;
}

interface UseInfiniteGroupListReturn {
  items: GroupListItemResponse[];
  nextCursor: number | null;
  error: Error | null;
  fetchNext: () => Promise<void>;
  handleRetry: () => void;
  reset: () => void;
}

/**
 * 무한 스크롤 커스텀 훅
 */
export const useInfiniteGroupList = ({
  initialCursor,
  initialItems,
  initialKeyword,
}: UseInfiniteGroupListParams): UseInfiniteGroupListReturn => {
  const [keyword, setKeyword] = useState<string | undefined>(initialKeyword);
  const [items, setItems] = useState<GroupListItemResponse[]>(initialItems);
  const [nextCursor, setNextCursor] = useState<number | null>(initialCursor);
  const [error, setError] = useState<Error | null>(null);

  const isFetchingRef = useRef(false);
  const prevKeywordRef = useRef(initialKeyword);

  /**
   * 에러 객체 생성 헬퍼 함수
   */
  const createError = useCallback((err: unknown, defaultMessage: string): Error => {
    return err instanceof Error ? err : new Error(defaultMessage);
  }, []);

  /**
   * 첫 페이지 조회 함수 // 콘솔은 지우지 말아주세요 🙏🏻
   */
  const fetchFirstPage = useCallback(
    async (searchKeyword?: string): Promise<void> => {
      if (isFetchingRef.current) return;

      isFetchingRef.current = true;
      const currentKeyword = searchKeyword ?? keyword;

      console.log('첫 페이지 요청 시작', {
        '요청 크기': GROUP_LIST_PAGE_SIZE,
        키워드: currentKeyword || '없음',
      });

      try {
        const response = await API.groupService.getGroups({
          keyword: currentKeyword,
          size: GROUP_LIST_PAGE_SIZE,
        });

        console.log('첫 페이지 요청 완료', {
          '요청 크기': GROUP_LIST_PAGE_SIZE,
          '받은 데이터 개수': response.items.length,
          '누적 데이터 개수': response.items.length,
          '다음 커서': response.nextCursor,
          키워드: currentKeyword || '없음',
        });

        setItems(response.items);
        setNextCursor(response.nextCursor);
        setError(null);
      } catch (err) {
        const error = createError(err, '모임 목록을 불러오는데 실패했습니다.');
        console.error('첫 페이지 조회 실패:', error);
        setError(error);
      } finally {
        isFetchingRef.current = false;
      }
    },
    [keyword, createError],
  );

  /**
   * 다음 페이지 조회 가능 여부 확인
   */
  const canFetchNext = useCallback((): boolean => {
    return nextCursor !== null && !isFetchingRef.current;
  }, [nextCursor]);

  /**
   * 다음 페이지 요청 함수
   */
  const fetchNext = useCallback(async (): Promise<void> => {
    if (!canFetchNext()) {
      return;
    }

    isFetchingRef.current = true;

    console.log('다음 페이지 요청 시작', {
      '요청 크기': GROUP_LIST_PAGE_SIZE,
      '현재 커서': nextCursor,
      '현재 누적 데이터 개수': items.length,
      키워드: keyword || '없음',
    });

    try {
      const response = await API.groupService.getGroups({
        keyword,
        cursor: nextCursor as number,
        size: GROUP_LIST_PAGE_SIZE,
      });

      const previousItemsCount = items.length;
      const newItemsCount = previousItemsCount + response.items.length;

      console.log('다음 페이지 요청 완료', {
        '요청 크기': GROUP_LIST_PAGE_SIZE,
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
        });
      }

      setItems((prevItems) => [...prevItems, ...response.items]);
      setNextCursor(response.nextCursor);
      setError(null);
    } catch (err) {
      const error = createError(err, '다음 페이지를 불러오는데 실패했습니다.');
      console.error('다음 페이지 조회 실패:', error);
      setError(error);
    } finally {
      isFetchingRef.current = false;
    }
  }, [canFetchNext, nextCursor, keyword, items.length, createError]);

  /**
   * 재시도 함수
   */
  const handleRetry = useCallback(() => {
    setError(null);
    if (items.length === 0) {
      fetchFirstPage(initialKeyword);
    } else {
      fetchNext();
    }
  }, [items.length, initialKeyword, fetchFirstPage, fetchNext]);

  /**
   * 상태 초기화 함수
   */
  const reset = useCallback(() => {
    setItems([]);
    setNextCursor(null);
    setError(null);
    isFetchingRef.current = false;
  }, []);

  /**
   * 입력 키워드 변경 감지 및 첫 페이지 재요청
   */
  useEffect(() => {
    if (prevKeywordRef.current === initialKeyword) return;

    reset();
    setKeyword(initialKeyword);
    fetchFirstPage(initialKeyword);
    prevKeywordRef.current = initialKeyword;
  }, [initialKeyword, reset, fetchFirstPage]);

  /**
   * 초기 데이터 로그
   */
  useEffect(() => {
    console.log('초기 데이터 로드 완료', {
      '요청 크기': GROUP_LIST_PAGE_SIZE,
      '받은 데이터 개수': initialItems.length,
      '누적 데이터 개수': initialItems.length,
      '다음 커서': initialCursor,
      키워드: initialKeyword || '없음',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    items,
    nextCursor,
    error,
    fetchNext,
    handleRetry,
    reset,
  };
};
