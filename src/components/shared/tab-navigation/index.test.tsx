import { usePathname } from 'next/navigation';

import { render, screen } from '@testing-library/react';

import { TabNavigation } from './index';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('TabNavigation', () => {
  const mockUsePathname = usePathname as jest.Mock;

  const twoTabs = [
    { label: '팔로잉', path: '/following' },
    { label: '메세지', path: '/message' },
  ];

  const threeTabs = [
    { label: '현재 모임', path: '/schedule/current' },
    { label: '나의 모임', path: '/schedule/my' },
    { label: '모임 이력', path: '/schedule/history' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('렌더링', () => {
    test('2개의 탭을 렌더링한다', () => {
      mockUsePathname.mockReturnValue('/following');
      render(<TabNavigation tabs={twoTabs} />);

      expect(screen.getByText('팔로잉')).toBeInTheDocument();
      expect(screen.getByText('메세지')).toBeInTheDocument();
    });

    test('3개의 탭을 렌더링한다', () => {
      mockUsePathname.mockReturnValue('/schedule/current');
      render(<TabNavigation tabs={threeTabs} />);

      expect(screen.getByText('현재 모임')).toBeInTheDocument();
      expect(screen.getByText('나의 모임')).toBeInTheDocument();
      expect(screen.getByText('모임 이력')).toBeInTheDocument();
    });

    test('각 탭이 올바른 경로로 링크된다', () => {
      mockUsePathname.mockReturnValue('/following');
      render(<TabNavigation tabs={twoTabs} />);

      const followingLink = screen.getByRole('link', { name: '팔로잉' });
      const messageLink = screen.getByRole('link', { name: '메세지' });

      expect(followingLink).toHaveAttribute('href', '/following');
      expect(messageLink).toHaveAttribute('href', '/message');
    });
  });

  describe('활성 탭 스타일', () => {
    test('현재 경로와 일치하는 탭에 mint-600 색상을 적용한다', () => {
      mockUsePathname.mockReturnValue('/following');
      render(<TabNavigation tabs={twoTabs} />);

      const followingLink = screen.getByRole('link', { name: '팔로잉' });
      expect(followingLink).toHaveClass('text-mint-600');
    });

    test('현재 경로와 일치하지 않는 탭에 gray-600 색상을 적용한다', () => {
      mockUsePathname.mockReturnValue('/following');
      render(<TabNavigation tabs={twoTabs} />);

      const messageLink = screen.getByRole('link', { name: '메세지' });
      expect(messageLink).toHaveClass('text-gray-600');
    });

    test('활성 탭에만 mint-500 인디케이터를 표시한다', () => {
      mockUsePathname.mockReturnValue('/schedule/my');
      const { container } = render(<TabNavigation tabs={threeTabs} />);

      const indicators = container.querySelectorAll('.bg-mint-500');
      expect(indicators).toHaveLength(1);
    });
  });

  describe('경로 변경', () => {
    test('경로가 변경되면 활성 탭이 업데이트된다', () => {
      mockUsePathname.mockReturnValue('/schedule/current');
      const { rerender } = render(<TabNavigation tabs={threeTabs} />);

      let currentLink = screen.getByRole('link', { name: '현재 모임' });
      expect(currentLink).toHaveClass('text-mint-600');

      // 경로 변경
      mockUsePathname.mockReturnValue('/schedule/my');
      rerender(<TabNavigation tabs={threeTabs} />);

      const myLink = screen.getByRole('link', { name: '나의 모임' });
      expect(myLink).toHaveClass('text-mint-600');

      currentLink = screen.getByRole('link', { name: '현재 모임' });
      expect(currentLink).toHaveClass('text-gray-600');
    });
  });

  describe('엣지 케이스', () => {
    test('일치하는 경로가 없으면 모든 탭이 비활성 상태다', () => {
      mockUsePathname.mockReturnValue('/unknown-path');
      render(<TabNavigation tabs={twoTabs} />);

      const followingLink = screen.getByRole('link', { name: '팔로잉' });
      const messageLink = screen.getByRole('link', { name: '메세지' });

      expect(followingLink).toHaveClass('text-gray-600');
      expect(messageLink).toHaveClass('text-gray-600');
    });

    test('빈 탭 배열을 처리한다', () => {
      mockUsePathname.mockReturnValue('/');
      const { container } = render(<TabNavigation tabs={[]} />);

      const tabs = container.querySelectorAll('li');
      expect(tabs).toHaveLength(0);
    });
  });
});
