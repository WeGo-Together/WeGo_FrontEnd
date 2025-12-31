'use client';

import { Button } from '@/components/ui';
import { ModalContent, ModalDescription, ModalTitle, useModal } from '@/components/ui/modal';
import { useAttendGroup } from '@/hooks/use-group/use-group-attend';
import { useDeleteGroup } from '@/hooks/use-group/use-group-delete';
import { useKickGroupMember } from '@/hooks/use-group/use-group-kick';
import { useLeaveGroup } from '@/hooks/use-group/use-group-leave';

interface Props {
  type: 'attend' | 'leave' | 'delete' | 'kick';
  groupId: string;
  targetUserId?: string;
}

export const GroupModal = ({ type, groupId, targetUserId = '' }: Props) => {
  const { close } = useModal();
  const { mutateAsync: attendMutate, isPending: isAttending } = useAttendGroup({ groupId });
  const { mutateAsync: leaveMutate, isPending: isCanceling } = useLeaveGroup({ groupId });
  const { mutateAsync: deleteMutate, isPending: isDeleting } = useDeleteGroup({ groupId });
  const { mutateAsync: kickMutate, isPending: isKicking } = useKickGroupMember({
    groupId,
    targetUserId,
  });

  const isPending = isAttending || isCanceling || isDeleting || isKicking;

  const { title, description, confirm } = MODAL_MESSAGE[type];

  const handleConfirmClick = async () => {
    if (type === 'attend') await attendMutate();
    else if (type === 'leave') await leaveMutate();
    else if (type === 'delete') await deleteMutate();
    else if (type === 'kick') await kickMutate();

    close();
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
  },
  leave: {
    title: '모임을 정말 탈퇴하시겠어요?',
    description: '탈퇴 시 그룹채팅과 모임 활동이 종료돼요.',
    confirm: '탈퇴하기',
  },
  delete: {
    title: '모임을 정말 취소하시겠어요?',
    description: '취소 후에는 다시 복구할 수 없어요.',
    confirm: '취소하기',
  },
  kick: {
    title: `을 내보내시겠어요?`,
    description: '이 작업은 취소할 수 없습니다.',
    confirm: '내보내기',
  },
};
