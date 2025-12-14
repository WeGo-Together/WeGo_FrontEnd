'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';

import { MeetupModal } from '@/components/pages/meetup/meetup-modal';
import { Button } from '@/components/ui/button';
import { useModal } from '@/components/ui/modal';
import { GetGroupDetailsResponse } from '@/types/service/group';

interface Props {
  conditions: Pick<
    GetGroupDetailsResponse,
    'userStatus' | 'createdBy' | 'participantCount' | 'maxParticipants'
  >;
}

export const MeetupButtons = ({
  conditions: {
    userStatus: { isJoined },
    createdBy,
    participantCount,
    maxParticipants,
  },
}: Props) => {
  const [isHost, setIsHost] = useState<boolean | null>(null);
  const { open } = useModal();
  const { push } = useRouter();

  // 그룹 채팅방 아이디 추가해야됨
  const onEnterChatClick = () => {
    push('/message/id');
  };

  useEffect(() => {
    const checkIsHost = () => {
      const sessionId = Number(Cookies.get('userId'));
      setIsHost(sessionId === createdBy.userId);
    };

    checkIsHost();
  }, [createdBy]);

  return (
    <div className='sticky bottom-[56px] border-t-1 border-gray-200 bg-white px-4 py-3'>
      {isJoined ? (
        <div className='flex gap-[10px]'>
          <Button
            className='flex-[1.2]'
            variant='tertiary'
            onClick={() => open(<MeetupModal type={isHost ? 'cancel' : 'leave'} />)}
          >
            {isHost ? '모임 취소' : '모임 탈퇴'}
          </Button>
          <Button
            className='flex-2'
            disabled={participantCount >= maxParticipants}
            onClick={onEnterChatClick}
          >
            채팅 입장
          </Button>
        </div>
      ) : (
        <Button
          disabled={participantCount >= maxParticipants}
          onClick={() => open(<MeetupModal type='join' />)}
        >
          참여하기
        </Button>
      )}
    </div>
  );
};
