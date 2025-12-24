import { render, screen } from '@testing-library/react';

import { type CardTag, CardTags, getLastVisibleIndex } from '.';

// ResizeObserver 목
global.ResizeObserver = class ResizeObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
} as unknown as typeof global.ResizeObserver;

describe('getLastVisibleIndex', () => {
  it('태그들이 카드 너비를 넘어가지 않으면 모든 태그를 표시한다', () => {
    const maxWidth = 300;
    const tagWidths = [50, 60, 70];

    const result = getLastVisibleIndex(maxWidth, tagWidths, 4);

    expect(result).toBe(2);
  });

  it('카드 너비가 부족하면 일부 태그만 표시한다', () => {
    const maxWidth = 130;
    const tagWidths = [50, 60, 70];

    const result = getLastVisibleIndex(maxWidth, tagWidths, 4);

    expect(result).toBe(1);
  });

  it('첫 번째 태그도 카드 너비보다 크면 아무 태그도 표시하지 않는다', () => {
    const maxWidth = 30;
    const tagWidths = [50, 60];

    const result = getLastVisibleIndex(maxWidth, tagWidths, 4);

    expect(result).toBeNull();
  });

  it('태그가 없으면 null을 반환한다', () => {
    const maxWidth = 200;
    const tagWidths: number[] = [];

    const result = getLastVisibleIndex(maxWidth, tagWidths, 4);

    expect(result).toBeNull();
  });
});

describe('CardTags', () => {
  const mockTags: CardTag[] = [
    { id: 1, label: '자바' },
    { id: 2, label: '백엔드' },
    { id: 3, label: '스터디' },
  ];

  it('태그 텍스트가 렌더링된다', () => {
    render(<CardTags tags={mockTags} />);

    mockTags.forEach((tag) => {
      expect(screen.getByText(tag.label)).toBeInTheDocument();
    });
  });
});
