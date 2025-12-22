import { render, screen } from '@testing-library/react';

import { ModalProvider } from '@/components/ui';
import { useInfiniteScroll } from '@/hooks/use-group/use-group-infinite-list';

import FollowingPage from './page';

jest.mock('@/hooks/use-group/use-group-infinite-list', () => ({
  useInfiniteScroll: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: () => 'following',
  }),
}));

jest.mock('js-cookie', () => ({
  get: () => '1',
}));

describe('FollowingPage 테스트', () => {
  beforeEach(() => {
    (useInfiniteScroll as jest.Mock).mockReturnValue({
      items: [],
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      completedMessage: '',
    });
  });

  test('팔로잉이 없을 경우 FollowingNone을 보여준다', async () => {
    render(
      <ModalProvider>
        <FollowingPage />
      </ModalProvider>,
    );

    expect(await screen.findByText('아직 팔로우 한 사람이 없어요.')).toBeInTheDocument();
  });
});
