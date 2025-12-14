'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui';
import { ModalContent, ModalDescription, ModalTitle, useModal } from '@/components/ui/modal';
import { useAttendGroup } from '@/hooks/use-group/use-group-attend';
import { useCancelGroup } from '@/hooks/use-group/use-group-cancel';
import { useDeleteGroup } from '@/hooks/use-group/use-group-delete';

interface Props {
  type: 'attend' | 'cancel' | 'delete';
  groupId: string;
}

export const MeetupModal = ({ type, groupId }: Props) => {
  const { replace } = useRouter();
  const { close } = useModal();
  const { mutate: attendMutate, isPending: isAttending } = useAttendGroup({ groupId }, close);
  const { mutate: cancelMutate, isPending: isCanceling } = useCancelGroup({ groupId }, close);
  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteGroup({ groupId }, () => {
    close();
    replace('/');
  });

  const isPending = isAttending || isCanceling || isDeleting;

  const { title, description, confirm } = MODAL_MESSAGE[type];

  const handleConfirmClick = () => {
    if (type === 'attend') attendMutate();
    else if (type === 'cancel') cancelMutate();
    else if (type === 'delete') deleteMutate();
  };

  return (
    <ModalContent className='max-w-80'>
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
          {isPending ? '로딩중...' : confirm}
        </Button>
      </div>
    </ModalContent>
  );
};

const MODAL_MESSAGE = {
  attend: {
    title: '모임에 참여하시겠어요?',
    description: '참여 후 바로 그룹채팅에 참여할 수 있어요!',
    confirm: '참여하기',
    onConfirm: (attendMutate: () => void) => attendMutate(),
  },
  cancel: {
    title: '모임을 정말 탈퇴하시겠어요?',
    description: '탈퇴 시 그룹채팅과 모임 활동이 종료돼요.',
    confirm: '탈퇴하기',
    onConfirm: (cancelMutate: () => void) => cancelMutate(),
  },
  delete: {
    title: '모임을 정말 취소하시겠어요?',
    description: '취소 후에는 다시 복구할 수 없어요.',
    confirm: '취소하기',
    onConfirm: (deleteMutate: () => void) => deleteMutate(),
  },
};
