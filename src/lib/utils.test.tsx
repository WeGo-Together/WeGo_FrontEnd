import { render } from '@testing-library/react';

import { cn } from '@/lib/utils';

describe('cn 유틸함수 동작 테스트', () => {
  describe('custom typography는 color에 의해 삭제되지 않아야 한다.', () => {
    test('text-display-lg와 text-mint-500이 모두 적용된다.', () => {
      const { container } = render(
        <div className={cn('text-display-lg text-mint-500')}>테스트</div>,
      );
      const element = container.firstChild as HTMLElement;

      expect(element.className).toContain('text-display-lg');
      expect(element.className).toContain('text-mint-500');
    });

    test('text-text-md-bold와 text-gray-700이 모두 적용된다.', () => {
      const result = cn('text-text-md-bold text-gray-700');

      expect(result).toContain('text-text-md-bold');
      expect(result).toContain('text-gray-700');
    });
  });

  describe('서로 다른 custom typography class가 중복 적용될 때 중복이 제거된다.', () => {
    test('text-display-lg와 text-display-xs 중복 시 마지막만 남는다.', () => {
      const result = cn('text-display-lg text-display-xs');

      expect(result).toBe('text-display-xs');
      expect(result).not.toBe('text-display-lg');
    });

    test('text-text-xl과 text-text-sm 중복 시 마지막만 남는다.', () => {
      const result = cn('text-text-xl text-text-sm');

      expect(result).toBe('text-text-sm');
      expect(result).not.toBe('text-text-xl');
    });

    test('대표 클래스와 weight class 중복 적용될 때 중복이 제거된다. ', () => {
      const result = cn('text-display-lg text-display-lg-bold');

      expect(result).toBe('text-display-lg-bold');
      expect(result).not.toBe('text-display-lg');
    });
  });
});
