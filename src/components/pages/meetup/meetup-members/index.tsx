'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';

import clsx from 'clsx';

import type { DUMMY_MEETUP_DATA } from '@/app/meetup/[id]/page';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui';

interface Props {
  members: typeof DUMMY_MEETUP_DATA.members;
}

export const MeetupMembers = ({ members }: Props) => {
  const [showMore, setShowMore] = useState(false);

  const floorCount = Math.ceil(11 / 3);
  const showShowMoreButton = 2 < floorCount;

  const onShowMoreClick = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <section className='relative bg-gray-50 px-4 pt-6 pb-4'>
      <h3 className='text-text-md-semibold px-2 text-gray-800'>참여자 정보</h3>

      <div
        className={clsx(
          'mt-5 overflow-y-hidden transition-all',
          floorCount === 1 ? 'h-25' : 'h-50',
          showMore ? `h-[${100 * floorCount}px]` : 'h-50',
        )}
      >
        <ul className='flex flex-wrap'>
          {members.map(({ name, profileImage }) => (
            <li key={name} className='h-25 w-34 shrink-0'>
              <Link href={'#'} className='flex-col-center gap-[6px]'>
                <Image
                  width={64}
                  className='h-16 w-16 rounded-full'
                  alt='프로필 사진'
                  height={64}
                  objectFit='cover'
                  src={profileImage}
                />
                <p className='text-text-xs-medium line-clamp-1 w-full text-center break-all text-gray-800'>
                  {name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {showShowMoreButton && (
        <div className='flex-center'>
          <Button
            className='flex-center h-9 w-auto border-none bg-gray-50 px-4'
            size='sm'
            variant='secondary'
            onClick={onShowMoreClick}
          >
            {showMore ? '접기' : '더보기'}
            <Icon id={showMore ? 'chevron-up' : 'chevron-down'} width={16} height={16} />
          </Button>
        </div>
      )}
    </section>
  );
};
