'use client';

import Link from 'next/link';

import { useState } from 'react';

import clsx from 'clsx';

import { Icon } from '@/components/icon';
import { GroupModal } from '@/components/pages/group/group-modal';
import { AnimateDynamicHeight, ProfileImage } from '@/components/shared';
import { Button } from '@/components/ui';
import { useModal } from '@/components/ui';
import { GetGroupDetailsResponse, KickGroupMemberParams } from '@/types/service/group';

interface Props {
  members: GetGroupDetailsResponse['joinedMembers'];
  isHost: boolean;
}

export const GroupMembers = ({ members, isHost }: Props) => {
  const [expand, setExpand] = useState(false);
  const hasMoreMember = 2 < Math.ceil(members.length / 3);

  const { open } = useModal();

  const onExpandClick = () => {
    setExpand((prev) => !prev);
  };

  const onKickMemberClick = (
    targetUserId: KickGroupMemberParams['targetUserId'],
    targetUserName: string,
  ) => {
    open(<GroupModal targetInfo={{ targetUserId, targetUserName }} type='kick' />);
  };

  return (
    <section className='relative space-y-5 bg-gray-50 px-4 py-6 select-none'>
      <h3 className='text-text-md-semibold px-2 text-gray-800'>참여자 정보</h3>

      <AnimateDynamicHeight>
        <ul className='grid grid-cols-[repeat(auto-fill,minmax(115px,1fr))] gap-y-4'>
          {members.map(({ nickName, profileImage, userId }, idx) => (
            <li
              key={nickName}
              className={hasMoreMember && !expand ? '[&:nth-child(n+6)]:hidden' : 'block'}
            >
              <div className='flex-col-center gap-1.5'>
                <div className='relative'>
                  <Link href={`/profile/${userId}`}>
                    <ProfileImage size='lg' src={profileImage} />
                  </Link>
                  {isHost && idx !== 0 && (
                    <button
                      className='absolute top-0 right-0'
                      type='button'
                      onClick={() => onKickMemberClick(userId.toString(), nickName)}
                    >
                      <Icon id='kick' className='h-4 w-4' />
                    </button>
                  )}
                </div>

                <p
                  className={clsx(
                    'text-text-xs-medium line-clamp-1 w-full text-center break-all text-gray-800',
                    hasMoreMember && !expand && idx === 5 ? 'hidden' : 'block',
                  )}
                >
                  {nickName}
                </p>
              </div>
            </li>
          ))}
          {hasMoreMember && !expand && (
            <li className='mx-auto'>
              <div className='flex-center h-16 w-16 rounded-full bg-gray-200'>
                <span className='text-text-md-semibold text-gray-600'>{members.length - 5}+</span>
              </div>
            </li>
          )}
        </ul>
      </AnimateDynamicHeight>

      {hasMoreMember && (
        <div className='flex-center'>
          <Button
            className='flex-center h-9 w-auto border-none bg-gray-50 px-4'
            size='sm'
            variant='secondary'
            onClick={onExpandClick}
          >
            {expand ? '접기' : '더보기'}
            <Icon id={expand ? 'arrow-up' : 'arrow-down'} width={16} height={16} />
          </Button>
        </div>
      )}
    </section>
  );
};
