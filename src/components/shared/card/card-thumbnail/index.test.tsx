import { render, screen } from '@testing-library/react';

import { CardThumbnail } from '.';

describe('CardThumbnail', () => {
  const defaultProps = {
    title: '썸네일 테스트',
  };

  test('썸네일이 없으면 기본 그룹 이미지를 렌더링한다', () => {
    render(<CardThumbnail {...defaultProps} />);

    // 썸네일이 없으면 기본 그룹 이미지가 fallback으로 렌더링되어야 한다
    const img = screen.getByAltText(defaultProps.title);
    expect(img).toBeInTheDocument();
  });

  test('thumbnail이 있으면 이미지가 렌더링된다', () => {
    render(<CardThumbnail {...defaultProps} thumbnail='https://example.com/thumbnail.jpg' />);

    const img = screen.getByAltText(defaultProps.title);
    expect(img).toBeInTheDocument();
  });
});
