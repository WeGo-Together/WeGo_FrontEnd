import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { ModalProvider } from '@/components/ui';
import { ToastProvider } from '@/components/ui/toast/core';

import { FollowingSearch } from '.';

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const renderComponent = async () => {
  const queryClient = createQueryClient();

  await act(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <ModalProvider>
            <FollowingSearch userId={0} />
          </ModalProvider>
        </ToastProvider>
      </QueryClientProvider>,
    );
  });
};

describe('FollowingSearch', () => {
  test('렌더링된다', async () => {
    await renderComponent();
    expect(screen.getByText('팔로우 추가')).toBeInTheDocument();
  });

  test('클릭 시 FollowingModal이 열린다', async () => {
    await renderComponent();

    expect(screen.queryByText('팔로우 할 닉네임을 입력하세요')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('팔로우 추가'));

    expect(screen.getByText('팔로우 할 닉네임을 입력하세요')).toBeInTheDocument();
  });
});
