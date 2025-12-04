'use client';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { MeetupModal } from '@/components/pages/meetup/meetup-modal';
import { Button } from '@/components/ui/button';
import { useModal } from '@/components/ui/modal';

interface Props {
  progress: {
    current: number;
    max: number;
  };
  ownerInfo: {
    name: string;
  };
  members: {
    name: string;
  }[];
}

export const MeetupButtons = ({ progress: { current, max }, ownerInfo }: Props) => {
  const [isJoined, _] = useState(true);
  const { open } = useModal();
  const { push } = useRouter();

  // 그룹 채팅방 아이디 추가해야됨
  const onEnterChatClick = () => {
    push('/message/id');
  };

  // 방 주인이냐
  const isOwner = ownerInfo.name === '본인 계정 닉네임 ㅇㅇ';

  // 모임의 참가자라면 -> (모임 탈퇴 + 채팅 입장) 버튼
  // 본인이 생성한 방이면 -> (모임 취소 + 채팅 입장) 버튼
  if (isJoined) {
    return (
      <div className='sticky bottom-[56px] border-t-1 border-gray-200 bg-white px-4 py-3'>
        <div className='flex gap-[10px]'>
          <Button
            className='flex-[1.2]'
            variant='tertiary'
            onClick={() => open(<MeetupModal type={isOwner ? 'cancel' : 'leave'} />)}
          >
            {isOwner ? '모임 취소' : '모임 탈퇴'}
          </Button>
          <Button className='flex-2' disabled={current >= max} onClick={onEnterChatClick}>
            채팅 입장
          </Button>
        </div>
      </div>
    );
  }

  // 방 주인 아니고 참가자도 아닐때 -> 참여 버튼
  return (
    <div className='sticky bottom-[56px] border-t-1 border-gray-200 bg-white px-4 py-3'>
      <Button disabled={current >= max} onClick={() => open(<MeetupModal type='join' />)}>
        참여하기
      </Button>
    </div>
  );
};
