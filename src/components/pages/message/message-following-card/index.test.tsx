import { useRouter } from 'next/navigation';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { useCreateDMChat } from '@/hooks/use-chat/use-chat-dm';

import { FollowingCard } from '.';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks/use-chat/use-chat-dm', () => ({
  useCreateDMChat: jest.fn(),
}));

const defaultProps = {
  userId: 0,
  nickname: '얼룩말',
  profileImage: '/test.png',
  profileMessage: '안녕하세요!',
};
const routerPush = jest.fn();

describe('FollowingCard 컴포넌트 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: routerPush,
    });

    (useCreateDMChat as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue({
        chatRoomId: 123,
      }),
    });
  });

  test('렌더링 테스트', () => {
    render(<FollowingCard {...defaultProps} />);

    expect(screen.getByText('메세지')).toBeInTheDocument();
  });

  test('팔로잉 카드 클릭 시 router.push() 호출되는지 테스트.', () => {
    render(<FollowingCard {...defaultProps} />);

    fireEvent.click(screen.getByTestId('following-card'));

    expect(routerPush).toHaveBeenCalledWith('/profile/0');
  });

  test('메시지 버튼 클릭 시 DM 생성 후 채팅방으로 이동되는지 테스트.', async () => {
    render(<FollowingCard {...defaultProps} />);

    fireEvent.click(screen.getByText('메세지'));

    await waitFor(() => {
      expect(routerPush).toHaveBeenCalledWith('/message/chat/123');
    });
  });
});
