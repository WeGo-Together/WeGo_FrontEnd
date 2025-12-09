import { useRouter } from 'next/navigation';

import { render, screen } from '@testing-library/react';

import { FollowingList } from '.';

const TEST_ITEMS = [
  {
    id: 0,
    name: '신짱구',
    profileImage: 'http://test.com',
    profileMessage: '안녕하세요 신짱구입니다',
  },
  {
    id: 1,
    name: '김맹구',
    profileImage: 'http://test.com',
    profileMessage: '안녕하세요 김맹구입니다',
  },

  {
    id: 2,
    name: '흰둥이',
    profileImage: 'http://test.com',
    profileMessage: '안녕하세요 흰둥이입니다',
  },
];
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Following List 컴포넌트 테스트', () => {
  beforeEach(() => {
    // 각 테스트 전에 mock 초기화
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  test('모든 아이템이 렌더링 되는지 테스트', () => {
    render(<FollowingList items={TEST_ITEMS} />);

    TEST_ITEMS.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });
});
