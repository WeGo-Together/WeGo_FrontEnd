import React, { act } from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Toast } from '.';
import { ToastProvider, useToast } from './core';

interface ContentProps {
  content: React.ReactNode;
  options?: {
    duration?: number;
  };
}

describe('Toast', () => {
  const TestComponent = ({ content, options }: ContentProps) => {
    const { run } = useToast();
    return (
      <div>
        <button onClick={() => run(content, options)}>토스트 실행</button>
      </div>
    );
  };

  const renderToast = ({ content, options }: ContentProps) => {
    return render(
      <ToastProvider>
        <TestComponent content={content} options={options} />
      </ToastProvider>,
    );
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('Toast 컴포넌트 type을 지정하지 않으면 자동으로 info type이 적용된다.', async () => {
    render(<Toast>모임 신청 완료!</Toast>);
    const toast = screen.getByText('모임 신청 완료!');

    expect(toast).toHaveClass('text-mono-white bg-[#0D2D3A]/50');
  });

  test('option을 전달하지 않고 toast 실행 시 toast가 popup 되며 3초 후에 사라진다.', async () => {
    const TestToast = () => {
      return <Toast type='info'>모임 신청 완료! Share the fun</Toast>;
    };

    renderToast({ content: <TestToast /> });
    const user = userEvent.setup({ delay: null });

    // 토스트 실행
    const openButton = screen.getByText('토스트 실행');
    await user.click(openButton);

    // 토스트가 열렸는지 확인
    expect(screen.getByRole('status')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // 토스트가 사라졌는지 확인
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  test('duration을 5000으로 지정하면 toast가 popup 되며 5초 후에 사라진다.', async () => {
    const TestToast = () => {
      return <Toast type='info'>모임 신청 완료! Share the fun</Toast>;
    };

    renderToast({ content: <TestToast />, options: { duration: 5000 } });
    const user = userEvent.setup({ delay: null });

    // 토스트 실행
    const openButton = screen.getByText('토스트 실행');
    await user.click(openButton);

    // 토스트가 열렸는지 확인
    expect(screen.getByRole('status')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // 토스트가 사라졌는지 확인
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  test('toast run 을 연속으로 실행하면 toast가 여러개 popup 된다.', async () => {
    const TestToast = () => {
      return <Toast type='info'>모임 신청 완료! Share the fun</Toast>;
    };

    renderToast({ content: <TestToast />, options: { duration: 5000 } });
    const user = userEvent.setup({ delay: null });

    // 토스트 실행
    const openButton = screen.getByText('토스트 실행');
    await user.click(openButton);
    await user.click(openButton);

    // 모든 toast 탐색
    const toasts = screen.getAllByRole('status');

    // 토스트가 열렸는지 확인
    expect(toasts.length).toBe(2);
  });
});
