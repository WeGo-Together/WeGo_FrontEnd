'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';

import { revalidateGroupAction } from '@/app/group/[groupId]/actions';
import { GroupModalApprovalContent } from '@/components/pages/group/group-modal/approval-content';
import { GroupModalCommonContent } from '@/components/pages/group/group-modal/common-content';
import { Toast } from '@/components/ui';
import { ModalContent } from '@/components/ui/modal';
import { useToast } from '@/components/ui/toast/core';
import { useAttendGroup } from '@/hooks/use-group/use-group-attend';
import { useDeleteGroup } from '@/hooks/use-group/use-group-delete';
import { useKickGroupMember } from '@/hooks/use-group/use-group-kick';
import { useLeaveGroup } from '@/hooks/use-group/use-group-leave';
import { AttendGroupPayload } from '@/types/service/group';

type ModalType = 'attend' | 'approval' | 'pending' | 'leave' | 'delete' | 'kick';

interface BaseProps {
  type: Exclude<ModalType, 'kick'>;
  groupId?: string;
}

interface KickProps {
  type: 'kick';
  targetInfo: {
    targetUserId: string;
    targetUserName: string;
  };
  groupId?: string;
}

type Props = BaseProps | KickProps;

export const GroupModal = (props: Props) => {
  const { type } = props;

  const params = useParams();
  const groupId = props.groupId || (params as { groupId: string }).groupId;
  const { replace } = useRouter();
  const pathname = usePathname();
  const { run } = useToast();

  const { mutateAsync: attendMutate, isPending: isAttending } = useAttendGroup({ groupId });
  const { mutateAsync: leaveMutate, isPending: isCanceling } = useLeaveGroup({ groupId });
  const { mutateAsync: deleteMutate, isPending: isDeleting } = useDeleteGroup({ groupId });
  const { mutateAsync: kickMutate, isPending: isKicking } = useKickGroupMember({
    groupId,
    targetUserId: type === 'kick' ? props.targetInfo.targetUserId : '',
  });

  const isPending = isAttending || isCanceling || isDeleting || isKicking;

  const mutateByType = {
    attend: async () => {
      await attendMutate(undefined);
      run(
        <Toast offset='button' type='success'>
          모임 신청 완료! Share the fun
        </Toast>,
      );
    },
    approval: (message: AttendGroupPayload) => attendMutate(message),
    pending: () => leaveMutate(),
    leave: () => leaveMutate(),
    delete: async () => {
      await deleteMutate();
      await revalidateGroupAction(groupId);
      if (!pathname.startsWith('/schedule')) {
        replace('/');
      }
    },
    kick: () => kickMutate(),
  };

  return (
    <ModalContent className='max-w-80'>
      {type === 'approval' ? (
        <GroupModalApprovalContent
          isPending={isPending}
          modalContent={MODAL_CONTENTS['approval']()}
          onConfirmClick={mutateByType['approval']}
        />
      ) : (
        <GroupModalCommonContent
          isPending={isPending}
          modalContent={
            type === 'kick'
              ? MODAL_CONTENTS['kick'](props.targetInfo.targetUserName)
              : MODAL_CONTENTS[type]()
          }
          onConfirmClick={mutateByType[type]}
        />
      )}
    </ModalContent>
  );
};

const MODAL_CONTENTS = {
  attend: () => ({
    title: '모임에 참여하시겠어요?',
    description: '참여 후 바로 그룹채팅에 참여할 수 있어요!',
    confirmMessage: '참여하기',
  }),
  approval: () => ({
    title: '참여 신청하기',
    description: '참여 신청 메세지',
    confirmMessage: '신청하기',
  }),
  pending: () => ({
    title: '참여 신청을 취소하시겠어요?',
    description: '조금만 더 기다려 보는건 어떨까요?',
    confirmMessage: '취소하기',
  }),
  leave: () => ({
    title: '모임을 정말 탈퇴하시겠어요?',
    description: '탈퇴 시 그룹채팅과 모임 활동이 종료돼요.',
    confirmMessage: '탈퇴하기',
  }),
  delete: () => ({
    title: '모임을 정말 취소하시겠어요?',
    description: '취소 후에는 다시 복구할 수 없어요.',
    confirmMessage: '취소하기',
  }),
  kick: (targetUserName: string) => ({
    title: `${targetUserName} 님을 내보내시겠어요?`,
    description: '이 작업은 취소할 수 없습니다.',
    confirmMessage: '내보내기',
  }),
} as const;
