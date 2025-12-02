import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from './index';

describe('버튼 컴포넌트 테스트', () => {
  test('텍스트가 올바르게 나오는지 테스트', () => {
    render(<Button>버튼</Button>);

    const element = screen.getByText('버튼');

    expect(element).toBeInTheDocument();
  });

  test('default(primary) variant 테스트', () => {
    render(<Button>버튼</Button>);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-mint-400');
    expect(button).toHaveClass('text-mono-white');
    expect(button).toHaveClass('text-text-md-bold');
    expect(button).toHaveClass('w-full');
  });

  test('secondary variant 테스트', () => {
    render(<Button variant='secondary'>버튼</Button>);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-mono-white');
    expect(button).toHaveClass('border-mint-500');
    expect(button).toHaveClass('text-mint-500');
  });

  test('tertiary variant 테스트', () => {
    render(<Button variant='tertiary'>버튼</Button>);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-mono-white');
    expect(button).toHaveClass('border-gray-400');
    expect(button).toHaveClass('text-gray-600');
  });

  test('sm size 테스트', () => {
    render(<Button size='sm'>버튼</Button>);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('text-text-sm-semibold');
    expect(button).toHaveClass('h-11');
    expect(button).toHaveClass('max-w-[112px]');
  });

  test('disabled 테스트', () => {
    render(
      <Button disabled variant='primary'>
        버튼
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).toHaveClass('disabled:bg-gray-400');
  });

  test('onClick event 테스트', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>버튼</Button>);

    const button = screen.getByText('버튼');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('disabled 시 onClick 테스트', () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        버튼
      </Button>,
    );

    const button = screen.getByText('버튼');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
