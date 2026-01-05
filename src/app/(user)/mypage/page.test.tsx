import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { API } from '@/api';
import { ModalProvider } from '@/components/ui';
import { formatISO } from '@/lib/formatDateTime';
import { server } from '@/mock/server';
import { mockUserItems } from '@/mock/service/user/user-mock';
import { AuthProvider } from '@/providers';

import MyPage from './page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // 테스트에서 재시도 비활성화
        gcTime: Infinity, // Jest 환경에서 카비지 컬렉션을 위한 타이머 생성 방지
      },
    },
  });

const renderWithQueryClient = async (component: React.ReactElement) => {
  // 각 테스트마다 새로운 QueryClient 생성하여 독립적인 상태 유지 (useState 없이)
  const testQueryClient = createTestQueryClient();
  let renderResult;
  await act(async () => {
    renderResult = render(
      <QueryClientProvider client={testQueryClient}>
        <AuthProvider hasRefreshToken={false}>
          <ModalProvider>{component}</ModalProvider>
        </AuthProvider>
      </QueryClientProvider>,
    );
  });

  return renderResult;
};

describe('마이 페이지 테스트', () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());

  test('내 프로필 정보가 올바르게 표시되는지 테스트', async () => {
    const id = 1;
    const me = mockUserItems.find((item) => item.userId === id)!;

    await renderWithQueryClient(<MyPage />);

    await screen.findByRole('img', { name: '프로필 이미지' });

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(me.nickName);
    expect(screen.getByText(me.profileMessage)).toBeInTheDocument();

    expect(screen.getByText('팔로워')).toBeInTheDocument();
    expect(screen.getByText(me.followersCnt.toLocaleString())).toBeInTheDocument();
    expect(screen.getByText('팔로잉')).toBeInTheDocument();
    expect(screen.getByText(me.followeesCnt.toLocaleString())).toBeInTheDocument();

    expect(screen.getByText('MBTI')).toBeInTheDocument();
    expect(screen.getByText(me.mbti)).toBeInTheDocument();
    expect(screen.getByText('가입 일자')).toBeInTheDocument();
    expect(screen.getByText(formatISO(me.createdAt))).toBeInTheDocument();
    expect(screen.getByText('모임 참여')).toBeInTheDocument();
    expect(screen.getByText(`${me.groupJoinedCnt}회`));
    expect(screen.getByText('모임 생성')).toBeInTheDocument();
    expect(screen.getByText(`${me.groupCreatedCnt}회`));
  });

  test('설정 화면이 올바르게 표시되는지 테스트', async () => {
    await renderWithQueryClient(<MyPage />);

    // expect(await screen.findByText('알림 받기')).toBeInTheDocument();
    expect(await screen.findByText('로그아웃')).toBeInTheDocument();
    // expect(screen.getByText('로그아웃')).toBeInTheDocument();
    expect(screen.getByText('회원탈퇴')).toBeInTheDocument();
  });

  test('프로필 편집 모달이 정상적으로 열리는지 테스트', async () => {
    const user = userEvent.setup();

    await renderWithQueryClient(<MyPage />);

    const profileEditButton = await screen.findByRole('button', { name: '프로필 수정하기' });
    await user.click(profileEditButton);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 2, name: '프로필 수정' })).toBeInTheDocument();
    });
  });

  // test('알림 설정이 정상적으로 동작하는지 테스트', async () => {
  //   const user = userEvent.setup();

  //   const updateNotificationSpy = jest.spyOn(API.userService, 'updateMyNotification');
  //   await renderWithQueryClient(<MyPage />);

  //   const notificationButton = await screen.findByRole('button', { name: '알림 받기' });
  //   await user.click(notificationButton);

  //   await waitFor(() => {
  //     expect(updateNotificationSpy).toHaveBeenCalled();
  //   });
  // });

  test('로그아웃이 정상적으로 동작하는지 테스트', async () => {
    const user = userEvent.setup();
    const logoutSpy = jest.spyOn(API.authService, 'logout');
    await renderWithQueryClient(<MyPage />);

    const logoutButton = await screen.findByRole('button', { name: '로그아웃' });
    await user.click(logoutButton);

    await waitFor(() => {
      expect(logoutSpy).toHaveBeenCalled();
    });
  });

  test('회원탈퇴가 정상적으로 동작하는지 테스트', async () => {
    const user = userEvent.setup();
    const withdrawSpy = jest.spyOn(API.authService, 'withdraw');
    await renderWithQueryClient(<MyPage />);

    const withdrawButton = await screen.findByRole('button', { name: '회원탈퇴' });
    await user.click(withdrawButton);

    await waitFor(() => {
      expect(withdrawSpy).toHaveBeenCalled();
    });
  });
});
