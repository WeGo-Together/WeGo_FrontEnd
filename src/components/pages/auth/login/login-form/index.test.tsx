import { useRouter } from 'next/navigation';

import { render } from '@testing-library/react';

import { LoginForm } from '.';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
const routerPush = jest.fn();

describe('LoginForm 컴포넌트 테스트', () => {
  beforeEach(() => {
    // 각 테스트 전에 mock 초기화
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: routerPush,
    });
  });

  test('초기 렌더 테스트', () => {
    render(<LoginForm />);
  });
});
