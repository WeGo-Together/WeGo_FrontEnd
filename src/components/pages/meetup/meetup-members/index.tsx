'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';

import clsx from 'clsx';

import { Icon } from '@/components/icon';
import { AnimateDynamicHeight } from '@/components/shared';
import { Button } from '@/components/ui';
import { GetGroupDetailsResponse } from '@/types/service/group';

interface Props {
  members: GetGroupDetailsResponse['joinedMembers'];
}

export const MeetupMembers = ({ members }: Props) => {
  const [expand, setExpand] = useState(false);
  const [coverMember, setCoverMember] = useState(2 < Math.ceil(members.length / 3));

  const hasMoreMember = 2 < Math.ceil(members.length / 3);

  const defaultProfileImageUrl =
    'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const onExpandClick = () => {
    setExpand((prev) => !prev);
    setCoverMember((prev) => !prev);
  };

  return (
    <section className='relative space-y-5 bg-gray-50 px-4 py-6 select-none'>
      <h3 className='text-text-md-semibold px-2 text-gray-800'>참여자 정보</h3>

      <AnimateDynamicHeight>
        <ul className='grid grid-cols-[repeat(auto-fill,minmax(115px,1fr))] gap-y-4'>
          {members.map(({ nickName, profileImage, userId }, idx) => (
            <li
              key={nickName}
              className={clsx(
                'relative',
                hasMoreMember && !expand ? '[&:nth-child(n+7)]:hidden' : 'block',
              )}
            >
              <div className='flex-col-center gap-1.5'>
                <Link href={`/profile/${userId}`}>
                  <Image
                    width={64}
                    className='h-16 w-16 rounded-full'
                    alt='프로필 사진'
                    draggable={false}
                    height={64}
                    objectFit='cover'
                    src={profileImage ?? defaultProfileImageUrl}
                  />
                </Link>
                <p
                  className={clsx(
                    'text-text-xs-medium line-clamp-1 w-full text-center break-all text-gray-800',
                    coverMember && idx === 5 ? 'hidden' : 'block',
                  )}
                >
                  {nickName}
                </p>
              </div>

              {coverMember && idx === 5 && (
                <div className='absolute inset-0'>
                  <span className='flex-center text-text-md-semibold mx-auto h-[65px] w-[65px] rounded-full bg-gray-200 text-gray-600'>
                    {members.length - 5}+
                  </span>
                </div>
              )}
            </li>
          ))}
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
