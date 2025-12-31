'use client';

import { Button } from '@/components/ui';
import { ModalDescription, ModalTitle } from '@/components/ui/modal';
import { useModal } from '@/components/ui/modal';
import { GetGroupDetailsResponse, KickGroupMemberResponse } from '@/types/service/group';

interface Props {
  modalContent: {
    title: string;
    description: string;
    confirmMessage: string;
  };
  isPending: boolean;
  // 모임 삭제 API는 반환값이 없음 그래서 -> 유니온 void 적용
  onConfirmClick: () => Promise<GetGroupDetailsResponse | KickGroupMemberResponse | void>;
}

export const GroupModalCommonContent = ({
  modalContent: { title, description, confirmMessage },
  isPending,
  onConfirmClick,
}: Props) => {
  const { close } = useModal();

  const handleConfirmClick = async () => {
    await onConfirmClick();
    close();
  };

  return (
    <>
      <ModalTitle className='pt-8 text-center break-keep'>{title}</ModalTitle>
      <ModalDescription className='text-center break-keep'>{description}</ModalDescription>
      <div className='mt-6 flex gap-2'>
        <Button
          className='!text-text-sm-semibold w-[50%]'
          size='sm'
          variant='tertiary'
          onClick={close}
        >
          취소
        </Button>
        <Button
          className='!text-text-sm-bold w-[50%]'
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
