import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import {
  ModalContent,
  ModalDescription,
  ModalProvider,
  ModalTitle,
  useModal,
} from '@/components/ui/modal';

const meta = {
  title: 'Components/Modal',
  component: ModalContent,
  decorators: [
    (Story) => (
      <ModalProvider>
        <Story />
      </ModalProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ModalContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. ModalTitle, ModalDescription이 보이는 형태
const BasicModal = () => {
  return (
    <ModalContent>
      <ModalTitle>ModalTitle 입니다.</ModalTitle>
      <ModalDescription>ModalDescription 입니다.</ModalDescription>
      <p className='text-text-xs-regular'>
        aria-labelledby 속성을 통해 스크린 리더가 ModalTitle을 읽습니다.
      </p>
      <p className='text-text-xs-regular'>
        aria-describedby 속성을 통해 스크린 리더가 ModalDescription을 읽습니다.
      </p>
    </ModalContent>
  );
};

export const Basic: Story = {
  args: {
    children: null,
  },
  render: () => {
    const ModalTrigger = () => {
      const { open } = useModal();
      return (
        <button
          className='bg-mint-400 rounded-lg px-4 py-2 text-white'
          onClick={() => open(<BasicModal />)}
        >
          Modal Open
        </button>
      );
    };
    return <ModalTrigger />;
  },
};

// 2. ModalTitle, ModalDescription이 sr-only인 형태
const AccessibleModal = () => {
  return (
    <ModalContent>
      <ModalTitle className='sr-only'>접근성을 위한 제목</ModalTitle>
      <ModalDescription className='sr-only'>
        이 모달은 스크린 리더 사용자를 위한 설명을 포함하고 있습니다.
      </ModalDescription>
      <div className='p-6'>
        <p className='text-gray-800'>실제로 보이는 콘텐츠입니다.</p>
      </div>
    </ModalContent>
  );
};

export const AccessibleOnly: Story = {
  args: {
    children: null,
  },
  render: () => {
    const ModalTrigger = () => {
      const { open } = useModal();
      return (
        <button
          className='bg-mint-400 rounded-lg px-4 py-2 text-white'
          onClick={() => open(<AccessibleModal />)}
        >
          Modal Open
        </button>
      );
    };
    return <ModalTrigger />;
  },
};

// 3. 확인, 취소 버튼이 있고 확인 시 1초 후 종료
const ConfirmModal = () => {
  const { close } = useModal();
  const [isPending, setIsPending] = useState(false);

  const handleConfirm = () => {
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      close();
    }, 1000);
  };

  return (
    <ModalContent>
      <ModalTitle>모임에 참여하시겠어요?</ModalTitle>
      <ModalDescription className='mb-6'>
        참여 후 바로 그룹채팅에 참여할 수 있어요!
      </ModalDescription>
      <div className='flex flex-row gap-2'>
        <button
          className='typo-text-sm-semibold w-34 cursor-pointer rounded-2xl border-1 border-gray-400 bg-white py-3 text-gray-600'
          type='button'
          onClick={close}
        >
          취소
        </button>
        <button
          className='typo-text-sm-bold bg-mint-400 w-34 cursor-pointer rounded-2xl py-3 text-white disabled:bg-gray-500'
          disabled={isPending}
          onClick={handleConfirm}
        >
          {isPending ? '로딩중...' : '참여하기'}
        </button>
      </div>
    </ModalContent>
  );
};

export const WithConfirmCancel: Story = {
  args: {
    children: null,
  },
  render: () => {
    const ModalTrigger = () => {
      const { open } = useModal();
      return (
        <button
          className='bg-mint-400 rounded-lg px-4 py-2 text-white'
          onClick={() => open(<ConfirmModal />)}
        >
          Modal Open
        </button>
      );
    };
    return <ModalTrigger />;
  },
};
