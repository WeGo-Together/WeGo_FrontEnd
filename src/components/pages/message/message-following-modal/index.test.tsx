import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ModalProvider } from '@/components/ui';
import { useAddFollowers } from '@/hooks/use-follower';

import { FollowingModal } from '.';

// Mock 설정
jest.mock('@/hooks/use-follower');

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const renderWithQueryClient = async (component: React.ReactElement) => {
  const testQueryClient = createQueryClient();
  let renderResult;

  await act(async () => {
    renderResult = render(
      <QueryClientProvider client={testQueryClient}>
        <ModalProvider>{component}</ModalProvider>
      </QueryClientProvider>,
    );
  });

  return renderResult;
};

describe('FollowingModal 테스트', () => {
  const mockMutate = jest.fn();
  const mockUserId = 123;

  beforeEach(() => {
    jest.clearAllMocks();

    // 기본 mock 설정
    (useAddFollowers as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    });
  });

  test('FollowingModal 렌더링 테스트', async () => {
    await renderWithQueryClient(<FollowingModal userId={mockUserId} />);

    expect(screen.getByText('팔로우 할 닉네임을 입력하세요')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('nickname')).toBeInTheDocument();
  });

  test('닉네임 입력이 정상적으로 동작한다', async () => {
    await renderWithQueryClient(<FollowingModal userId={mockUserId} />);

    const input = screen.getByPlaceholderText('nickname');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(input).toHaveValue('test');
  });

  test('Enter 키 입력 시 폼이 제출된다', async () => {
    mockMutate.mockImplementation((_data, options) => {
      options?.onSuccess?.();
    });

    await renderWithQueryClient(<FollowingModal userId={mockUserId} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({ followNickname: 'test' }, expect.any(Object));
    });
  });
});
