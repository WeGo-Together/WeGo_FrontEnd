import { render, screen } from '@testing-library/react';

import { FollowingNone } from '.';

describe('Following None 컴포넌트 테스트', () => {
  test('Following None 렌더링 테스트', () => {
    render(<FollowingNone />);
    expect(screen.getByText('아직 팔로우 한 사람이 없어요.'));
  });
});
