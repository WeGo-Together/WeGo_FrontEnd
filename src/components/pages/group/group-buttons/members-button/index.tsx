import { useRouter } from 'next/navigation';

import { GroupModal } from '@/components/pages/group/group-modal';
import { Button, useModal } from '@/components/ui';
import { GetGroupDetailsResponse } from '@/types/service/group';

interface Props {
  conditions: {
    isHost: boolean;
  };
  chatRoomId: GetGroupDetailsResponse['chatRoomId'];
}

export const MembersButton = ({ conditions: { isHost }, chatRoomId }: Props) => {
  const { open } = useModal();
  const { push } = useRouter();

  const onEnterChatClick = () => {
    push(`/message/chat/${chatRoomId}`);
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
