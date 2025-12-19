import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ModalProvider } from '@/components/ui';
import { useAddFollowers } from '@/hooks/use-follower';

import { FollowingSearch } from '.';

jest.mock('@/hooks/use-follower', () => ({
  useAddFollowers: jest.fn(),
}));

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
  let queryClient: QueryClient;
  const renderForm = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <FollowingSearch userId={0} />
        </ModalProvider>
      </QueryClientProvider>,
    );

  beforeEach(() => {
    jest.clearAllMocks();

    (useAddFollowers as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    });

    queryClient = createQueryClient();
  });

  test('Following Search 렌더링 테스트', () => {
    renderForm();

    expect(screen.getByText('팔로우 추가')).toBeInTheDocument();
  });

  test('팔로우 추가 클릭 시 모달 생성', () => {
    renderForm();

    expect(screen.queryByText('팔로우 할 닉네임을 입력하세요')).toBeNull();

    fireEvent.click(screen.getByText('팔로우 추가'));

    expect(screen.getByText('팔로우 할 닉네임을 입력하세요')).toBeInTheDocument();
  });

  test('공백 상태로 팔로우 버튼 클릭 시 에러 메시지 렌더링 테스트.', () => {
    renderForm();

    fireEvent.click(screen.getByText('팔로우 추가'));

    const followButton = screen.getByRole('button', { name: '팔로우' });
    fireEvent.click(followButton);

    expect(screen.getByText('닉네임을 입력해주세요.')).toBeInTheDocument();
  });

  test('팔로우 추가 성공 테스트', async () => {
    (useAddFollowers as jest.Mock).mockReturnValue({
      mutate: jest.fn((_data, options) => {
        options?.onSuccess?.();
      }),
    });

    renderForm();

    // 모달 열기
    fireEvent.click(screen.getByText('팔로우 추가'));

    // 닉네임 입력
    fireEvent.change(screen.getByPlaceholderText('nickname'), {
      target: { value: 'HelloWorld' },
    });

    // 팔로우 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: '팔로우' }));

    // 모달 닫힘 테스트
    await waitFor(() => {
      expect(screen.queryByText('팔로우 할 닉네임을 입력하세요')).toBeNull();
    });
  });

  test('팔로우 추가 실패 테스트', async () => {
    (useAddFollowers as jest.Mock).mockReturnValue({
      mutate: jest.fn((_data, options) => {
        options?.onError?.();
      }),
    });

    renderForm();

    // 모달 열기
    fireEvent.click(screen.getByText('팔로우 추가'));

    expect(screen.getByText('팔로우 할 닉네임을 입력하세요')).toBeInTheDocument();

    // 잘못된 닉네임 입력
    fireEvent.change(screen.getByPlaceholderText('nickname'), { target: { value: '중복닉네임' } });

    // 팔로우 버튼 클릭
    fireEvent.click(screen.getByText('팔로우'));

    // 에러 div 체크
    expect(screen.getByText('존재하지 않는 유저입니다.'));
  });

  test('취소 버튼 클릭 시 모달 닫힘', async () => {
    renderForm();
    fireEvent.click(screen.getByText('팔로우 추가'));

    expect(screen.getByText('팔로우 할 닉네임을 입력하세요')).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: '취소' });
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByText('팔로우 할 닉네임을 입력하세요')).not.toBeInTheDocument();
    });
  });

  test('에러 메세지가 떠 있는 상태에서 input 변경 시 에러 메세지 사라짐', () => {
    (useAddFollowers as jest.Mock).mockReturnValue({
      mutate: jest.fn((_data, options) => {
        options?.onError?.();
      }),
    });

    renderForm();

    fireEvent.click(screen.getByText('팔로우 추가'));

    expect(screen.getByText('팔로우 할 닉네임을 입력하세요')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('nickname'), {
      target: { value: '잘못된 닉네임' },
    });

    fireEvent.click(screen.getByText('팔로우'));

    expect(screen.getByText('존재하지 않는 유저입니다.'));

    fireEvent.change(screen.getByPlaceholderText('nickname'), {
      target: { value: '잘못된 닉네임ㅋ' },
    });

    expect(screen.queryByText('존재하지 않는 유저입니다.')).toBeNull();
  });

  test('input에서 Enter 키 입력 시 팔로우가 실행', async () => {
    (useAddFollowers as jest.Mock).mockReturnValue({
      mutate: jest.fn((_data, options) => {
        options?.onSuccess?.();
      }),
    });

    renderForm();

    // 모달 열기
    fireEvent.click(screen.getByText('팔로우 추가'));

    const input = screen.getByRole('textbox');

    // 닉네임 입력
    fireEvent.change(input, {
      target: { value: 'HelloWorld' },
    });

    // Enter 키 입력
    fireEvent.keyDown(input, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    // 성공 시 모달 닫힘
    await waitFor(() => {
      expect(screen.queryByText('팔로우 할 닉네임을 입력하세요')).toBeNull();
    });
  });
});
