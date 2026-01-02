'use client';

import Image from 'next/image';

import { useState } from 'react';

import { DEFAULT_PROFILE_IMAGE } from 'constants/default-images';

import { Icon } from '@/components/icon';
import { useModal } from '@/components/ui';
import { useGetParticipants } from '@/hooks/use-chat';

import { UserOutModal } from './UserOutModal';

interface UserListProps {
  onClose: () => void;
  roomId: number;
  roomType: 'DM' | 'GROUP';
}

export const UserList = ({ onClose, roomId, roomType }: UserListProps) => {
  const [isManaging, setIsManaging] = useState(false);
  const { open } = useModal();
  const { data } = useGetParticipants(roomId);
  console.log(roomType);
  return (
    <div className='bg-mono-white flex h-[calc(100vh-112px)] flex-col'>
      {/* 헤더 */}
      <div className='flex items-center justify-between border-b border-gray-200 px-5 py-3'>
        <Icon id='chevron-left-2' className='w-6 cursor-pointer text-gray-500' onClick={onClose} />
        <span className='text-text-md-bold flex items-center gap-1'>
          <span className='text-gray-800'>참여자</span>
          <span className='text-mint-500'>{data?.totalCount}</span>
        </span>
        {roomType === 'GROUP' ? (
          <button
            className='text-text-sm-semibold cursor-pointer'
            onClick={() => setIsManaging(!isManaging)}
          >
            {isManaging ? (
              <span className='text-gray-600'>완료</span>
            ) : (
              <span className='text-mint-600'>관리</span>
            )}
          </button>
        ) : (
          <div></div>
        )}
      </div>

      {/* 유저 리스트 */}
      <div className='scrollbar-thin flex-1 overflow-y-auto'>
        {data?.participants.map((user, index) => (
          <div key={user.userId}>
            <div className='bg-mono-white flex h-22 items-center gap-4 p-5'>
              <div className='h-12 w-12 overflow-hidden rounded-full'>
                <Image
                  width={48}
                  className='h-full w-full object-cover'
                  alt='profile'
                  height={48}
                  src={user.profileImage || DEFAULT_PROFILE_IMAGE}
                />
              </div>

              <div className='flex-1'>
                <div className='text-text-md-bold text-gray-800'>{user.nickName}</div>
                <div className='text-text-sm-medium line-clamp-1 text-gray-600'>
                  {user.userId || '상태 메시지가 없습니다.'}
                </div>
              </div>

              {/* 방장이 0번째로 들어온다면 이렇게, 방장이라는걸 알 수 있는 필드가 있다면 수정 */}
              {index === 0 ? (
                <span className='bg-mint-100 text-mint-700 text-text-xs-medium rounded-full px-2.5 py-1'>
                  방장
                </span>
              ) : null}

              {isManaging && index !== 0 && (
                <button
                  className='bg-error-500 flex h-5 w-5 items-center justify-center rounded-full'
                  onClick={(e) => {
                    e.stopPropagation();
                    open(<UserOutModal nickName={user.nickName} />);
                  }}
                >
                  <div className='bg-mono-white h-0.5 w-2.5' />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
