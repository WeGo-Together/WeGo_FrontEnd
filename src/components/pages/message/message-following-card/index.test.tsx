import { fireEvent, render, screen } from '@testing-library/react';

import FollowingCard from '.';

describe('FollowingCard 컴포넌트 테스트', () => {
  const defaultProps = {
    name: '얼룩말',
    profileImage: '/test.png',
    profileMessage: '안녕하세요!',
  };

  test('type=following 일 때 테스트', () => {
    render(<FollowingCard {...defaultProps} type='following' />);

    expect(screen.getByText('메세지')).toBeInTheDocument();
    expect(screen.queryByText('0')).not.toBeInTheDocument();
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

  test('팔로잉 카드 클릭 시 onClick 호출되는지 테스트.', () => {
    const handleClick = jest.fn();
    render(<FollowingCard {...defaultProps} type='following' onClick={handleClick} />);

    const card = screen.getByTestId('following-card');

    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('팔로잉 카드의 메시지 버튼 클릭 시 onMessageClick만 호출되는지 테스트.', () => {
    const handleClick = jest.fn();
    const handleMessageClick = jest.fn();

    render(
      <FollowingCard
        {...defaultProps}
        type='following'
        onClick={handleClick}
        onMessageClick={handleMessageClick}
      />,
    );

    const button = screen.getByText('메세지');
    fireEvent.click(button);

    expect(handleMessageClick).toHaveBeenCalledTimes(1);
    expect(handleClick).not.toHaveBeenCalled(); // 이벤트 버블 막힘 확인
  });
});
