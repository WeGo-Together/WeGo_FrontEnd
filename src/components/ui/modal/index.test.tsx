import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ModalContent, ModalDescription, ModalProvider, ModalTitle, useModal } from './index';

describe('Modal', () => {
  const TestModal = () => {
    return (
      <ModalContent>
        <ModalTitle>테스트 모달</ModalTitle>
        <ModalDescription>테스트 설명</ModalDescription>
        <button>첫 번째 버튼</button>
        <button>두 번째 버튼</button>
        <button>세 번째 버튼</button>
      </ModalContent>
    );
  };

  const TestComponent = () => {
    const { open } = useModal();
    return (
      <div>
        <button onClick={() => open(<TestModal />)}>모달 열기</button>
      </div>
    );
  };

  const renderModal = () => {
    return render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>,
    );
  };

  beforeEach(() => {
    renderModal();
  });

  test('Modal이 열린 상태에서 ModalCloseButton을 클릭하면 모달이 닫힌다', async () => {
    const user = userEvent.setup();

    // 모달 열기
    const openButton = screen.getByText('모달 열기');
    await user.click(openButton);

    // 모달이 열렸는지 확인
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // 닫기 버튼 클릭
    const closeButton = screen.getByLabelText('모달 닫기');
    await user.click(closeButton);

    // 모달이 닫혔는지 확인
    await waitFor(() => {
      expect(screen.queryByText('테스트 모달')).not.toBeInTheDocument();
    });
  });

  test('Modal이 열린 상태에서 외부(Backdrop)을 클릭하면 모달이 닫힌다', async () => {
    const user = userEvent.setup();

    // 모달 열기
    const openButton = screen.getByText('모달 열기');
    await user.click(openButton);

    // 모달이 열렸는지 확인
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // 모달 외부(백드롭) 클릭
    const backdrop = screen.getByRole('dialog');
    await user.click(backdrop);

    // 모달이 닫혔는지 확인
    await waitFor(() => {
      expect(screen.queryByText('테스트 모달')).not.toBeInTheDocument();
    });
  });

  test('Modal이 열린 상태에서 ESC를 입력하면 모달이 닫힌다', async () => {
    const user = userEvent.setup();

    // 모달 열기
    const openButton = screen.getByText('모달 열기');
    await user.click(openButton);

    // 모달이 열렸는지 확인
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // ESC 키 입력
    await user.keyboard(`{Escape}`);
    // 모달이 닫혔는지 확인
    await waitFor(() => {
      expect(screen.queryByText('테스트 모달')).not.toBeInTheDocument();
    });
  });
});
