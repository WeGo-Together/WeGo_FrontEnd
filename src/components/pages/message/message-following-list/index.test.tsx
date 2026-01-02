import { render, screen } from '@testing-library/react';

import { GetFollowerResponse } from '@/types/service/follow';

import { FollowingList } from '.';

jest.mock('../message-following-card', () => ({
  FollowingCard: ({ nickname }: { nickname: string }) => <div>{nickname}</div>,
}));

const TEST_ITEMS: GetFollowerResponse = {
  items: [
    {
      followId: 0,
      userId: 0,
      nickname: '신짱구',
      profileImage: 'http://test.com',
      profileMessage: '안녕하세요 신짱구입니다',
    },
    {
      followId: 1,
      userId: 1,
      nickname: '김맹구',
      profileImage: 'http://test.com',
      profileMessage: '안녕하세요 김맹구입니다',
    },
    {
      followId: 2,
      userId: 2,
      nickname: '흰둥이',
      profileImage: 'http://test.com',
      profileMessage: '안녕하세요 흰둥이입니다',
    },
  ],
  nextCursor: null,
};

describe('FollowingList 컴포넌트 테스트', () => {
  test('모든 아이템이 렌더링 되는지 테스트', () => {
    render(<FollowingList items={TEST_ITEMS.items} />);

    TEST_ITEMS.items.forEach((item) => {
      expect(screen.getByText(item.nickname)).toBeInTheDocument();
    });
  });
});
