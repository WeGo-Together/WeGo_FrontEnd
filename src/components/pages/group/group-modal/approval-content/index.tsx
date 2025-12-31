'use client';

import { useState } from 'react';

import { Button, Label } from '@/components/ui';
import { ModalTitle } from '@/components/ui/modal';
import { useModal } from '@/components/ui/modal';
import { AttendGroupPayload, GetGroupDetailsResponse } from '@/types/service/group';

interface Props {
  modalContent: {
    title: string;
    description: string;
    confirmMessage: string;
  };
  isPending: boolean;
  onConfirmClick: (approvalMessage: AttendGroupPayload) => Promise<GetGroupDetailsResponse>;
}

export const GroupModalApprovalContent = ({
  modalContent: { title, description, confirmMessage },
  isPending,
  onConfirmClick,
}: Props) => {
  const [message, setMessage] = useState('');
  const { close } = useModal();

  const handleConfirmClick = async () => {
    await onConfirmClick({ message });
    close();
  };

  return (
    <>
      <ModalTitle className='break-keep'>{title}</ModalTitle>
      <Label className='mt-6 px-1 break-keep' htmlFor='group-approval-message'>
        {description}
      </Label>
      <div className='mt-1'>
        <textarea
          id='group-approval-message'
          className='bg-mono-white scrollbar-thin focus:border-mint-500 text-text-md-medium h-35 w-full resize-none rounded-2xl border border-gray-300 px-5 py-4 text-gray-800 focus:outline-none'
          placeholder='방장에게 간단한 메시지를 남길 수 있어요.'
          value={message}
          onChange={(e) => {
            if (e.target.value.length <= 50) setMessage(e.target.value);
          }}
        />
        <Button
          className='!text-text-sm-bold mt-2'
          disabled={isPending}
          size='sm'
          onClick={handleConfirmClick}
        >
          {isPending ? '로딩중...' : confirmMessage}
        </Button>
      </div>
    </>
  );
};
