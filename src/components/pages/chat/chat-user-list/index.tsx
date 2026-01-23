'use client';

import { useState } from 'react';

import { Icon } from '@/components/icon';
import { ProfileImage } from '@/components/shared';
import { useModal } from '@/components/ui';
import { useGetParticipants } from '@/hooks/use-chat';

import { UserOutModal } from './UserOutModal';

interface UserProps {
  user: {
    userId: number;
    nickName: string;
    profileImage: string;
    profileMessage?: string;
    isOwner: boolean;
  };
  roomId: number;
  roomType: 'DM' | 'GROUP';
  isManaging: boolean;
  index: number;
}

interface UserListProps {
  onClose: () => void;
  roomId: number;
  roomType: 'DM' | 'GROUP';
  userId: number;
}

const User = ({ user, roomId, roomType, isManaging, index }: UserProps) => {
  const { open } = useModal();

  return (
    <div className='bg-mono-white flex h-22 items-center gap-4 p-5'>
      <div className='h-12 w-12 overflow-hidden rounded-full'>
        <ProfileImage size='md' src={user.profileImage} />
      </div>

      <div className='flex-1'>
        <div className='text-text-md-bold text-gray-800'>{user.nickName}</div>
        <div className='text-text-sm-medium line-clamp-1 text-gray-600'>
          {user.profileMessage || '상태 메시지가 없습니다.'}
        </div>
      </div>

      {roomType === 'GROUP' && user.isOwner && (
        <span className='bg-mint-100 text-mint-700 text-text-xs-medium rounded-full px-2.5 py-1'>
          방장
        </span>
      )}

      {isManaging && index !== 0 && (
        <button
          className='bg-error-500 flex h-5 w-5 items-center justify-center rounded-full'
          onClick={(e) => {
            e.stopPropagation();
            open(<UserOutModal nickName={user.nickName} roomId={roomId} userId={user.userId} />);
          }}
        >
          <div className='bg-mono-white h-0.5 w-2.5' />
        </button>
      )}
    </div>
  );
};

export const UserList = ({ onClose, roomId, roomType, userId }: UserListProps) => {
  const [isManaging, setIsManaging] = useState(false);
  const { data } = useGetParticipants(roomId);

  const isCurrentUserOwner = data?.participants.some(
    (participant) => participant.userId === userId && participant.isOwner,
  );
  const sortedParticipants = data?.participants
    ? [...data.participants].sort((a, b) => {
        if (a.isOwner === b.isOwner) return 0;
        return a.isOwner ? -1 : 1;
      })
    : [];

  return (
    <div className='bg-mono-white flex h-[calc(100vh-112px)] flex-col'>
      {/* 헤더 */}
      <div className='flex items-center justify-between border-b border-gray-200 px-5 py-3'>
        <Icon id='chevron-left-2' className='w-6 cursor-pointer text-gray-500' onClick={onClose} />
        <span className='text-text-md-bold flex items-center gap-1'>
          <span className='text-gray-800'>참여자</span>
          <span className='text-mint-500'>{data?.totalCount}</span>
        </span>
        {roomType === 'GROUP' && isCurrentUserOwner ? (
          <button
            className='text-text-sm-semibold cursor-pointer'
            onClick={() => setIsManaging(!isManaging)}
          >
            {isManaging ? (
              <span className='w-6 text-gray-600'>완료</span>
            ) : (
              <span className='text-mint-600 w-6'>관리</span>
            )}
          </button>
        ) : (
          <div className='w-6'></div>
        )}
      </div>

      {/* 유저 리스트 */}
      <div className='scrollbar-thin flex-1 overflow-y-auto'>
        {sortedParticipants.map((user, index) => (
          <div key={user.userId}>
            <User
              index={index}
              isManaging={isManaging}
              roomId={roomId}
              roomType={roomType}
              user={user}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
