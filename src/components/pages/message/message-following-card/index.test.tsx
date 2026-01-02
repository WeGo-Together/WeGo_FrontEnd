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

  test('type=following 일 때 테스트', () => {
    render(<FollowingCard {...defaultProps} type='following' />);

    expect(screen.getByText('메세지')).toBeInTheDocument();
  });

  test('type=message & count > 0 일 때 테스트', () => {
    render(<FollowingCard {...defaultProps} count={5} type='message' />);

    const badge = screen.getByText('5');

    expect(badge).toBeInTheDocument();
    expect(badge).not.toHaveClass('opacity-0');
  });

  test('type=message & count = 0 일 때 테스트', () => {
    render(<FollowingCard {...defaultProps} count={0} type='message' />);

    const badge = screen.getByText('0');

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('opacity-0');
  });

  test('count > 99 인 경우 "99+" 를 보여주는지 테스트.', () => {
    render(<FollowingCard {...defaultProps} count={100} type='message' />);

    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  test('팔로잉 카드 클릭 시 router.push() 호출되는지 테스트.', () => {
    render(<FollowingCard {...defaultProps} type='following' />);

    fireEvent.click(screen.getByTestId('following-card'));

    expect(routerPush).toHaveBeenCalledWith('/profile/0');
  });

  test('메시지 버튼 클릭 시 DM 생성 후 채팅방으로 이동되는지 테스트.', async () => {
    render(<FollowingCard {...defaultProps} type='following' />);

    fireEvent.click(screen.getByText('메세지'));

    await waitFor(() => {
      expect(routerPush).toHaveBeenCalledWith('/chat/123');
    });
  });
});
