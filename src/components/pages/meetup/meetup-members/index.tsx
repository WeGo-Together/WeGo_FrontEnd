'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';

import clsx from 'clsx';

import type { DUMMY_MEETUP_DATA } from '@/app/meetup/[groupId]/page';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui';

interface Props {
  members: typeof DUMMY_MEETUP_DATA.members;
}

export const MeetupMembers = ({ members }: Props) => {
  const [showMore, setShowMore] = useState(false);
  const [coverMember, setCoverMember] = useState(2 < Math.ceil(members.length / 3));

  const hasMoreMember = 2 < Math.ceil(members.length / 3);

  const onShowMoreClick = () => {
    setShowMore((prev) => !prev);
    setCoverMember((prev) => !prev);
  };

  return (
    <section className='relative bg-gray-50 px-4 pt-6 pb-4'>
      <h3 className='text-text-md-semibold px-2 text-gray-800'>참여자 정보</h3>

      <div className='mt-5'>
        <ul className='flex-center flex-wrap'>
          {members.map(({ name, profileImage }, idx) => (
            <li
              key={name}
              className={clsx(
                'relative h-25 w-34 shrink-0',
                hasMoreMember && !showMore ? '[&:nth-child(n+7)]:hidden' : 'block',
              )}
            >
              <div className='flex-col-center gap-[6px]'>
                <Link href={'#'} className='select-none'>
                  <Image
                    width={64}
                    className='h-16 w-16 rounded-full'
                    alt='프로필 사진'
                    height={64}
                    objectFit='cover'
                    src={profileImage}
                  />
                </Link>
                <p
                  className={clsx(
                    'text-text-xs-medium line-clamp-1 w-full text-center break-all text-gray-800',
                    coverMember && idx === 5 ? 'hidden' : 'block',
                  )}
                >
                  {name}
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
      </div>

      {hasMoreMember && (
        <div className='flex-center'>
          <Button
            className='flex-center h-9 w-auto border-none bg-gray-50 px-4'
            size='sm'
            variant='secondary'
            onClick={onShowMoreClick}
          >
            {showMore ? '접기' : '더보기'}
            <Icon id={showMore ? 'arrow-up' : 'arrow-down'} width={16} height={16} />
          </Button>
        </div>
      )}
    </section>
  );
};
