// import { useRouter } from 'next/navigation';

import { GroupModal } from '@/components/pages/group/group-modal';
import { Button, useModal } from '@/components/ui';

interface Props {
  conditions: {
    isHost: boolean;
  };
}

export const MembersButton = ({ conditions: { isHost } }: Props) => {
  const { open } = useModal();
  // const { push } = useRouter();

  // 그룹 채팅방 아이디 추가해야됨
  const onEnterChatClick = () => {
    alert('채팅 파업');
    // push('/message/id');
  };

  return (
    <div className='flex gap-[10px]'>
      <Button
        className='flex-[1.2]'
        variant='tertiary'
        onClick={() => open(<GroupModal type={isHost ? 'delete' : 'leave'} />)}
      >
        {isHost ? '모임 취소' : '모임 탈퇴'}
      </Button>
      <Button className='flex-2' onClick={onEnterChatClick}>
        채팅 입장
      </Button>
    </div>
  );
};
