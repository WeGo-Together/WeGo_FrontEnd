'use client';

import { useState } from 'react';

import { ModalContent, ModalDescription, ModalTitle, useModal } from '@/components/ui/modal';

interface Props {
  type: 'join' | 'leave' | 'cancel';
}

export const MeetupModal = ({ type }: Props) => {
  const { close } = useModal();
  const [isPending, setIsPending] = useState(false);

  const handleConfirm = () => {
    setIsPending(true);

    setTimeout(() => {
      setIsPending(false);
      close();
    }, 1000);
  };

  const { title, description, confirm } = MODAL_MESSAGE[type];

  return (
    <ModalContent className='max-w-80'>
      <ModalTitle className='pt-8 text-center break-keep'>{title}</ModalTitle>
      <ModalDescription className='text-center break-keep'>{description}</ModalDescription>
      <div className='mt-6 flex gap-2'>
        <button
          className='text-text-sm-semibold h-10 w-[50%] cursor-pointer rounded-xl border-1 border-gray-400 bg-white text-gray-600'
          type='button'
          onClick={close}
        >
          취소
        </button>
        <button
          className='text-text-sm-bold bg-mint-400 h-10 w-[50%] cursor-pointer rounded-xl text-white disabled:bg-gray-500'
          disabled={isPending}
          onClick={handleConfirm}
        >
          {isPending ? '로딩중...' : confirm}
        </button>
      </div>
    </ModalContent>
  );
};

const MODAL_MESSAGE = {
  join: {
    title: '모임에 참여하시겠어요?',
    description: '참여 후 바로 그룹채팅에 참여할 수 있어요!',
    confirm: '참여하기',
  },
  leave: {
    title: '모임을 정말 탈퇴하시겠어요?',
    description: '탈퇴 시 그룹채팅과 모임 활동이 종료돼요.',
    confirm: '탈퇴하기',
  },
  cancel: {
    title: '모임을 정말 취소하시겠어요?',
    description: '취소 후에는 다시 복구할 수 없어요.',
    confirm: '취소하기',
  },
};
