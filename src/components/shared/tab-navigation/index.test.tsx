import { useSearchParams } from 'next/navigation';

import { render, screen } from '@testing-library/react';

import { TabNavigation } from './index';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

describe('TabNavigation', () => {
  const mockUseSearchParams = useSearchParams as jest.Mock;

  const twoTabs = [
    { label: '팔로잉', value: 'list' },
    { label: '메세지', value: 'message' },
  ];

  const threeTabs = [
    { label: '현재 모임', value: 'current' },
    { label: '나의 모임', value: 'my' },
    { label: '모임 이력', value: 'history' },
  ];

  const createMockSearchParams = (tab: string | null) => ({
    get: jest.fn((key: string) => (key === 'tab' ? tab : null)),
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('렌더링', () => {
    test('2개의 탭을 렌더링한다', () => {
      mockUseSearchParams.mockReturnValue(createMockSearchParams('list'));
      render(<TabNavigation basePath='/following' tabs={twoTabs} />);

      expect(screen.getByText('팔로잉')).toBeInTheDocument();
      expect(screen.getByText('메세지')).toBeInTheDocument();
    });

    test('sticky 스타일이 적용된다 (Header 아래 고정)', () => {
      mockUseSearchParams.mockReturnValue(createMockSearchParams('list'));
      const { container } = render(<TabNavigation basePath='/following' tabs={twoTabs} />);

      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('sticky');
      expect(nav).toHaveClass('top-14');
      expect(nav).toHaveClass('z-50');
    });

    test('3개의 탭을 렌더링한다', () => {
      mockUseSearchParams.mockReturnValue(createMockSearchParams('current'));
      render(<TabNavigation basePath='/schedule' tabs={threeTabs} />);

      expect(screen.getByText('현재 모임')).toBeInTheDocument();
      expect(screen.getByText('나의 모임')).toBeInTheDocument();
      expect(screen.getByText('모임 이력')).toBeInTheDocument();
    });

    test('각 탭이 올바른 쿼리 파라미터로 링크된다', () => {
      mockUseSearchParams.mockReturnValue(createMockSearchParams('list'));
      render(<TabNavigation basePath='/following' tabs={twoTabs} />);

      const followingLink = screen.getByRole('link', { name: '팔로잉' });
      const messageLink = screen.getByRole('link', { name: '메세지' });

      expect(followingLink).toHaveAttribute('href', '/following?tab=list');
      expect(messageLink).toHaveAttribute('href', '/following?tab=message');
    });
  });

  describe('활성 탭 스타일', () => {
    test('현재 탭과 일치하는 탭에 mint-600 색상을 적용한다', () => {
      mockUseSearchParams.mockReturnValue(createMockSearchParams('list'));
      render(<TabNavigation basePath='/following' tabs={twoTabs} />);

      const followingLink = screen.getByRole('link', { name: '팔로잉' });
      expect(followingLink).toHaveClass('text-mint-600');
    });

    test('현재 탭과 일치하지 않는 탭에 gray-600 색상을 적용한다', () => {
      mockUseSearchParams.mockReturnValue(createMockSearchParams('list'));
      render(<TabNavigation basePath='/following' tabs={twoTabs} />);

      const messageLink = screen.getByRole('link', { name: '메세지' });
      expect(messageLink).toHaveClass('text-gray-600');
    });

    test('활성 탭에만 mint-500 인디케이터를 표시한다', () => {
      mockUseSearchParams.mockReturnValue(createMockSearchParams('my'));
      const { container } = render(<TabNavigation basePath='/schedule' tabs={threeTabs} />);

      const indicators = container.querySelectorAll('.bg-mint-500');
      expect(indicators).toHaveLength(1);
    });
  });

  describe('쿼리 파라미터', () => {
    test('파라미터가 없으면 첫 번째 탭이 활성화된다', () => {
      mockUseSearchParams.mockReturnValue(createMockSearchParams(null));
      render(<TabNavigation basePath='/schedule' tabs={threeTabs} />);

      const currentLink = screen.getByRole('link', { name: '현재 모임' });
      expect(currentLink).toHaveClass('text-mint-600');
    });

    test('커스텀 paramName을 사용할 수 있다', () => {
      const customMockSearchParams = {
        get: jest.fn((key: string) => (key === 'section' ? 'list' : null)),
      };
      mockUseSearchParams.mockReturnValue(customMockSearchParams);

      render(<TabNavigation basePath='/following' paramName='section' tabs={twoTabs} />);

      const followingLink = screen.getByRole('link', { name: '팔로잉' });
      expect(followingLink).toHaveAttribute('href', '/following?section=list');
    });
  });

  describe('엣지 케이스', () => {
    test('유효하지 않은 탭 값이면 첫 번째 탭이 활성화된다', () => {
      mockUseSearchParams.mockReturnValue(createMockSearchParams('invalid'));
      const { container } = render(<TabNavigation basePath='/schedule' tabs={threeTabs} />);

      const indicators = container.querySelectorAll('.bg-mint-500');
      expect(indicators).toHaveLength(0);
    });
  });
});
