import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { formatISO } from '@/lib/formatDateTime';
import { server } from '@/mock/server';
import { createMockSuccessResponse } from '@/mock/service/common/common-mock';
import { mockUserItems } from '@/mock/service/user/user-mock';
import { AuthProvider } from '@/providers';

import ProfilePage from './page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
    push: jest.fn(),
    back: jest.fn(),
  })),
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
        <AuthProvider hasRefreshToken={false}>{component}</AuthProvider>
      </QueryClientProvider>,
    );
  });

  return renderResult;
};

describe('프로필 페이지 테스트', () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());

  test('프로필 정보가 올바르게 표시되는지 테스트', async () => {
    const id = 2;
    const user = mockUserItems.find((item) => item.userId === id)!;

    await renderWithQueryClient(<ProfilePage params={Promise.resolve({ userId: String(id) })} />);

    await screen.findByRole('img', { name: '프로필 이미지' });

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(user.nickName);
    expect(screen.getByText(user.profileMessage)).toBeInTheDocument();

    expect(screen.getByText('팔로워')).toBeInTheDocument();
    expect(screen.getByText(user.followersCnt.toLocaleString())).toBeInTheDocument();
    expect(screen.getByText('팔로잉')).toBeInTheDocument();
    expect(screen.getByText(user.followeesCnt.toLocaleString())).toBeInTheDocument();

    expect(screen.getByText('MBTI')).toBeInTheDocument();
    expect(screen.getByText(user.mbti)).toBeInTheDocument();
    expect(screen.getByText('가입 일자')).toBeInTheDocument();
    expect(screen.getByText(formatISO(user.createdAt))).toBeInTheDocument();
    expect(screen.getByText('모임 참여')).toBeInTheDocument();
    expect(screen.getByText(`${user.groupJoinedCnt}회`));
    expect(screen.getByText('모임 생성')).toBeInTheDocument();
    expect(screen.getByText(`${user.groupCreatedCnt}회`));
  });

  test('팔로우 중이 아니면 팔로우 하기 버튼이 보이는지 테스트', async () => {
    server.use(
      http.get('*/users/2', () => {
        return HttpResponse.json(
          createMockSuccessResponse({
            ...mockUserItems[1],
            isFollow: false,
          }),
        );
      }),
    );

    await renderWithQueryClient(<ProfilePage params={Promise.resolve({ userId: '2' })} />);

    await screen.findByRole('img', { name: '프로필 이미지' });

    expect(screen.getByRole('button', { name: '팔로우 하기' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '팔로우 취소' })).not.toBeInTheDocument();
  });

  test('팔로우 중이면 팔로우 취소 버튼이 보이는지 테스트', async () => {
    server.use(
      http.get('*/users/2', () => {
        return HttpResponse.json(
          createMockSuccessResponse({
            ...mockUserItems[1],
            isFollow: true,
          }),
        );
      }),
    );
    await renderWithQueryClient(<ProfilePage params={Promise.resolve({ userId: '2' })} />);

    await screen.findByRole('img', { name: '프로필 이미지' });

    expect(screen.getByRole('button', { name: '팔로우 취소' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '팔로우 하기' })).not.toBeInTheDocument();
  });
});
