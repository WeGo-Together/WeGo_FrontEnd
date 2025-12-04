import Image from 'next/image';
import Link from 'next/link';

import type { DUMMY_MEETUP_DATA } from '@/app/meetup/[id]/page';

interface Props {
  members: typeof DUMMY_MEETUP_DATA.members;
}

export const MeetupMembers = ({ members }: Props) => {
  return (
    <section className='bg-gray-50 px-4 pt-6 pb-4'>
      <h3 className='text-text-md-semibold px-2 text-gray-800'>참여자 정보</h3>
      <ul className='flex-center mt-5 flex-wrap gap-y-4'>
        {members.map(({ name, profileImage }) => (
          <li key={name} className='w-34 shrink-0'>
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
    </section>
  );
};
