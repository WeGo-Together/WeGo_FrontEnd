import { render, screen } from '@testing-library/react';

import { API } from '@/api';

import Current from './index';

jest.mock('@/hooks/use-group/use-group-infinite-list', () => ({
  useInfiniteScroll: jest.fn(),
}));

jest.mock('@/hooks/use-intersection-observer', () => ({
  useIntersectionObserver: jest.fn(),
}));

jest.mock('@/api', () => ({
  API: {
    groupService: {
      getMyGroups: jest.fn(),
    },
  },
}));

jest.mock('../meetings/index', () => ({
  Meetings: jest.fn(() => <div data-testid='meetings' />),
}));

import { useInfiniteScroll } from '@/hooks/use-group/use-group-infinite-list';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const mockUseInfiniteScroll = useInfiniteScroll as jest.MockedFunction<typeof useInfiniteScroll>;
const mockUseIntersectionObserver = useIntersectionObserver as jest.MockedFunction<
  typeof useIntersectionObserver
>;

describe('Current', () => {
  const mockSentinelRef = { current: null };
  let onIntersectCallback: (() => void) | null = null;

  beforeEach(() => {
    jest.clearAllMocks();
    onIntersectCallback = null;

    mockUseIntersectionObserver.mockImplementation(({ onIntersect }) => {
      onIntersectCallback = onIntersect;
      return mockSentinelRef;
    });

    mockUseInfiniteScroll.mockReturnValue({
      items: [],
      nextCursor: null,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isFetching: false,
      isLoading: false,
      completedMessage: '모든 현재 모임을 불러왔습니다.',
      refetch: jest.fn(),
    });
  });

  test('컴포넌트가 정상적으로 렌더링된다', () => {
    render(<Current />);

    expect(screen.getByTestId('meetings')).toBeInTheDocument();
  });

  test('queryFn이 올바른 API를 호출한다', async () => {
    mockUseInfiniteScroll.mockReturnValue({
      items: [],
      nextCursor: null,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isFetching: false,
      isLoading: false,
      completedMessage: '',
      refetch: jest.fn(),
    });

    render(<Current />);

    const queryFn = mockUseInfiniteScroll.mock.calls[0][0].queryFn;
    await queryFn({ cursor: 0, size: 10 });

    expect(API.groupService.getMyGroups).toHaveBeenCalledWith({
      type: 'current',
      cursor: 0,
      size: 10,
      myStatuses: ['ATTEND', 'PENDING'],
    });
  });

  test('intersection observer의 onIntersect가 호출되면 fetchNextPage가 호출된다', () => {
    const mockFetchNextPage = jest.fn();

    mockUseInfiniteScroll.mockReturnValue({
      items: [],
      nextCursor: 100,
      error: null,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
      isFetching: false,
      isLoading: false,
      completedMessage: '',
      refetch: jest.fn(),
    });

    render(<Current />);

    expect(onIntersectCallback).not.toBeNull();
    onIntersectCallback?.();

    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
  });

  test('hasNextPage가 false일 때는 fetchNextPage가 호출되지 않는다', () => {
    const mockFetchNextPage = jest.fn();

    mockUseInfiniteScroll.mockReturnValue({
      items: [],
      nextCursor: null,
      error: null,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
      isFetching: false,
      isLoading: false,
      completedMessage: '',
      refetch: jest.fn(),
    });

    render(<Current />);

    expect(onIntersectCallback).not.toBeNull();
    onIntersectCallback?.();

    expect(mockFetchNextPage).not.toHaveBeenCalled();
  });

  test('isFetchingNextPage가 true일 때는 fetchNextPage가 호출되지 않는다', () => {
    const mockFetchNextPage = jest.fn();

    mockUseInfiniteScroll.mockReturnValue({
      items: [],
      nextCursor: 100,
      error: null,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: true,
      isFetching: false,
      isLoading: false,
      completedMessage: '',
      refetch: jest.fn(),
    });

    render(<Current />);

    expect(onIntersectCallback).not.toBeNull();
    onIntersectCallback?.();

    expect(mockFetchNextPage).not.toHaveBeenCalled();
  });
});
