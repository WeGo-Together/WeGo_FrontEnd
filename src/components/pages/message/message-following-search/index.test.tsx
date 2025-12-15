import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';

import { ModalProvider } from '@/components/ui';

import { FollowingSearch } from '.';

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

describe('Following Search 테스트', () => {
  const queryClient = createQueryClient();
  test('Following Search 렌더링 테스트', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <FollowingSearch userId={0} />
        </ModalProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText('팔로우 추가')).toBeInTheDocument();
  });

  test('팔로우 추가 클릭 시 모달 생성', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <FollowingSearch userId={0} />
        </ModalProvider>
      </QueryClientProvider>,
    );

    expect(screen.queryByText('팔로우 할 닉네임을 입력하세요')).toBeNull();

    fireEvent.click(screen.getByText('팔로우 추가'));

    expect(screen.getByText('팔로우 할 닉네임을 입력하세요')).toBeInTheDocument();
  });
});
