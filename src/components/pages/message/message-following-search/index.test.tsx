import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ModalProvider } from '@/components/ui';
import { useAddFollowers } from '@/hooks/use-follower';

import { FollowingSearch } from '.';

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

describe('Following Search 테스트', () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // 기본 mock 설정
    (useAddFollowers as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    });
  });

  test('Following Search 렌더링 테스트', async () => {
    await renderWithQueryClient(<FollowingSearch userId={0} />);
    expect(screen.getByText('팔로우 추가')).toBeInTheDocument();
  });

  test('팔로우 추가 클릭 시 모달 생성', async () => {
    await renderWithQueryClient(<FollowingSearch userId={0} />);

    expect(screen.queryByText('팔로우 할 닉네임을 입력하세요')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('팔로우 추가'));

    expect(screen.getByText('팔로우 할 닉네임을 입력하세요')).toBeInTheDocument();
  });

  test('공백 상태로 팔로우 버튼 클릭 시 에러 메시지 렌더링', async () => {
    await renderWithQueryClient(<FollowingSearch userId={0} />);

    fireEvent.click(screen.getByText('팔로우 추가'));
    fireEvent.click(screen.getByRole('button', { name: '팔로우' }));

    expect(screen.getByText('닉네임을 입력해주세요.')).toBeInTheDocument();
  });

  test('팔로우 추가 성공 시 모달 닫힘', async () => {
    mockMutate.mockImplementation((_data, options) => {
      options?.onSuccess?.();
    });

    await renderWithQueryClient(<FollowingSearch userId={0} />);

    fireEvent.click(screen.getByText('팔로우 추가'));
    fireEvent.change(screen.getByPlaceholderText('nickname'), {
      target: { value: 'HelloWorld' },
    });
    fireEvent.click(screen.getByRole('button', { name: '팔로우' }));

    await waitFor(() => {
      expect(screen.queryByText('팔로우 할 닉네임을 입력하세요')).not.toBeInTheDocument();
    });
  });

  test('팔로우 추가 실패 시 에러 메시지 표시', async () => {
    mockMutate.mockImplementation((_data, options) => {
      options?.onError?.();
    });

    await renderWithQueryClient(<FollowingSearch userId={0} />);

    fireEvent.click(screen.getByText('팔로우 추가'));
    fireEvent.change(screen.getByPlaceholderText('nickname'), {
      target: { value: '중복닉네임' },
    });
    fireEvent.click(screen.getByText('팔로우'));

    expect(screen.getByText('존재하지 않는 유저입니다.')).toBeInTheDocument();
  });

  test('취소 버튼 클릭 시 모달 닫힘', async () => {
    await renderWithQueryClient(<FollowingSearch userId={0} />);

    fireEvent.click(screen.getByText('팔로우 추가'));
    fireEvent.click(screen.getByRole('button', { name: '취소' }));

    await waitFor(() => {
      expect(screen.queryByText('팔로우 할 닉네임을 입력하세요')).not.toBeInTheDocument();
    });
  });

  test('input 변경 시 에러 메시지 사라짐', async () => {
    mockMutate.mockImplementation((_data, options) => {
      options?.onError?.();
    });

    await renderWithQueryClient(<FollowingSearch userId={0} />);

    fireEvent.click(screen.getByText('팔로우 추가'));
    fireEvent.change(screen.getByPlaceholderText('nickname'), {
      target: { value: '잘못된 닉네임' },
    });
    fireEvent.click(screen.getByText('팔로우'));

    expect(screen.getByText('존재하지 않는 유저입니다.')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('nickname'), {
      target: { value: '잘못된 닉네임ㅋ' },
    });

    expect(screen.queryByText('존재하지 않는 유저입니다.')).not.toBeInTheDocument();
  });

  test('Enter 키 입력 시 팔로우 실행', async () => {
    mockMutate.mockImplementation((_data, options) => {
      options?.onSuccess?.();
    });

    await renderWithQueryClient(<FollowingSearch userId={0} />);

    fireEvent.click(screen.getByText('팔로우 추가'));

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'HelloWorld' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(screen.queryByText('팔로우 할 닉네임을 입력하세요')).not.toBeInTheDocument();
    });
  });
});
