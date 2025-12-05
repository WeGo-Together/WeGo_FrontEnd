import { render, screen } from '@testing-library/react';

import { CardThumbnail } from '.';

describe('CardThumbnail', () => {
  const defaultProps = {
    title: '썸네일 테스트',
    onError: jest.fn(),
  };

  test('썸네일이 없으면 회색 배경 박스만 렌더링된다', () => {
    render(<CardThumbnail {...defaultProps} hasThumbnail={false} />);

    // 이미지가 없으므로 alt로 찾을 수 있는 이미지 요소가 없어야 한다
    expect(screen.queryByAltText(defaultProps.title)).not.toBeInTheDocument();
  });

  test('hasThumbnail과 thumbnail이 모두 truthy이면 이미지가 렌더링된다', () => {
    render(
      <CardThumbnail
        {...defaultProps}
        hasThumbnail
        thumbnail='https://example.com/thumbnail.jpg'
      />,
    );

    const img = screen.getByAltText(defaultProps.title);
    expect(img).toBeInTheDocument();
  });
});
