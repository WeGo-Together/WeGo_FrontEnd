import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Card from '.';

describe('Card', () => {
  const defaultProps = {
    title: '네즈코와 함께하는 자바 스터디',
    images: [],
    tags: ['#자바', '#백엔드', '#스터디'],
    location: '서울 강남구 · 강남역 2번 출구 근처 카페',
    dateTime: '25. 12. 10 - 19:00',
    nickName: '네즈코',
    participantCount: 8,
    maxParticipants: 10,
    profileImage: null as string | null,
  };

  test('기본 정보(제목, 위치, 날짜/시간, 인원 수)를 렌더링한다', () => {
    render(<Card {...defaultProps} />);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.location)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.dateTime)).toBeInTheDocument();
    expect(
      screen.getByText(`${defaultProps.participantCount}/${defaultProps.maxParticipants}`),
    ).toBeInTheDocument();
  });

  test('프로필 이미지가 없으면 기본 프로필 이미지를 렌더링한다', () => {
    render(<Card {...defaultProps} />);

    // profileImage가 null이면 기본 프로필 이미지가 렌더링되어야 한다
    const profileImg = screen.getByRole('img', { name: defaultProps.nickName });
    expect(profileImg).toBeInTheDocument();
  });

  test('onClick이 전달되면 카드 전체가 클릭 가능하고 핸들러가 호출된다', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    const { container } = render(<Card {...defaultProps} onClick={handleClick} />);

    const card = container.querySelector('.cursor-pointer');
    expect(card).toBeInTheDocument();

    await user.click(card!);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('썸네일과 프로필 이미지가 있을 때 이미지를 렌더링한다', () => {
    const imageUrl = 'https://example.com/image.jpg';
    const profileUrl = 'https://example.com/profile.jpg';

    render(<Card {...defaultProps} images={[imageUrl]} profileImage={profileUrl} />);

    // 썸네일 alt는 title, 프로필 alt는 nickName
    expect(screen.getByAltText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByAltText(defaultProps.nickName)).toBeInTheDocument();
  });
});
