import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import { FollowingContent } from '@/components/pages/message/message-following-content';
import { ModalProvider } from '@/components/ui';
import { useInfiniteScroll } from '@/hooks/use-group/use-group-infinite-list';

jest.mock('@/hooks/use-group/use-group-infinite-list', () => ({
  useInfiniteScroll: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: () => 'following',
  }),
}));

describe('FollowingPage 테스트', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    (useInfiniteScroll as jest.Mock).mockReturnValue({
      items: [],
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      completedMessage: '',
    });
  });

  afterEach(() => {
    queryClient.clear();
  });

  test('팔로잉이 없을 경우 FollowingNone을 보여준다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <FollowingContent initialUserId={1} />
        </ModalProvider>
      </QueryClientProvider>,
    );

    expect(await screen.findByText('아직 팔로우 한 사람이 없어요.')).toBeInTheDocument();
  });
});
