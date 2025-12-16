import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

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

  test('공백 상태로 팔로우 버튼 클릭 시 에러 메시지 렌더링 테스트.', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <FollowingSearch userId={0} />
        </ModalProvider>
      </QueryClientProvider>,
    );

    fireEvent.click(screen.getByText('팔로우 추가'));

    const followButton = screen.getByRole('button', { name: '팔로우' });
    fireEvent.click(followButton);

    expect(screen.getByText('닉네임을 입력해주세요.')).toBeInTheDocument();
  });

  test('취소 버튼 클릭 시 모달 닫힘', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <FollowingSearch userId={0} />
        </ModalProvider>
      </QueryClientProvider>,
    );
    fireEvent.click(screen.getByText('팔로우 추가'));

    expect(screen.getByText('팔로우 할 닉네임을 입력하세요')).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: '취소' });
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByText('팔로우 할 닉네임을 입력하세요')).not.toBeInTheDocument();
    });
  });
});
