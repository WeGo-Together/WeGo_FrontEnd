import { fireEvent, render, screen } from '@testing-library/react';

import { ModalProvider } from '@/components/ui';

import { FollowingSearch } from '.';

describe('Following Search 테스트', () => {
  test('Following Search 렌더링 테스트', () => {
    render(<FollowingSearch />);

    expect(screen.getByText('팔로우 추가')).toBeInTheDocument();
  });

  test('팔로우 추가 클릭 시 모달 생성', () => {
    render(
      <ModalProvider>
        <FollowingSearch />
      </ModalProvider>,
    );

    const followModal = screen.queryByText('팔로우 할 닉네임을 입력하세요');

    expect(followModal).toBeNull();

    fireEvent.click(screen.getByText('팔로우'));

    expect(followModal).toBeInTheDocument();
  });
});
