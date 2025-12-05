import { render, screen } from '@testing-library/react';

import { FollowingList } from '.';

const TEST_ITEMS = [
  {
    name: '신짱구',
    profileImage: 'imageUrl',
    profileMessage: '안녕하세요 신짱구입니다',
  },
  {
    name: '김맹구',
    profileImage: 'imageUrl',
    profileMessage: '안녕하세요 김맹구입니다',
  },

  {
    name: '흰둥이',
    profileImage: 'imageUrl',
    profileMessage: '안녕하세요 흰둥이입니다',
  },
];

describe('Following List 컴포넌트 테스트', () => {
  test('모든 아이템이 렌더링 되는지 테스트', () => {
    render(<FollowingList items={TEST_ITEMS} />);

    TEST_ITEMS.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });
});
