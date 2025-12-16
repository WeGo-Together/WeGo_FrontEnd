'use client';

// import { useRouter } from 'next/navigation';

import { MeetupModal } from '@/components/pages/meetup/meetup-modal';
import { Button } from '@/components/ui/button';
import { useModal } from '@/components/ui/modal';
import { GetGroupDetailsResponse } from '@/types/service/group';

interface Props {
  conditions: {
    isJoined: GetGroupDetailsResponse['userStatus']['isJoined'];
    isHost: boolean;
    isButtonDisabled: boolean;
  };
  groupId: string;
}

export const MeetupButtons = ({
  conditions: { isJoined, isHost, isButtonDisabled },
  groupId,
}: Props) => {
  const { open } = useModal();
  // const { push } = useRouter();

  // 그룹 채팅방 아이디 추가해야됨
  const onEnterChatClick = () => {
    alert('채팅 파업');
    // push('/message/id');
  };

  return (
    <div className='sticky bottom-[56px] border-t-1 border-gray-200 bg-white px-4 py-3'>
      {isJoined ? (
        <div className='flex gap-[10px]'>
          <Button
            className='flex-[1.2]'
            variant='tertiary'
            onClick={() =>
              open(<MeetupModal groupId={groupId} type={isHost ? 'delete' : 'cancel'} />)
            }
          >
            {isHost ? '모임 취소' : '모임 탈퇴'}
          </Button>
          <Button className='flex-2' disabled={isButtonDisabled} onClick={onEnterChatClick}>
            채팅 입장
          </Button>
        </div>
      ) : (
        <Button
          disabled={isButtonDisabled}
          onClick={() => open(<MeetupModal groupId={groupId} type='attend' />)}
        >
          참여하기
        </Button>
      )}
    </div>
  );
};
