import Image from 'next/image';
import Link from 'next/link';

import { DEFAULT_PROFILE_IMAGE } from 'constants/default-images';

import { GetGroupDetailsResponse } from '@/types/service/group';

interface Props {
  hostInfo: GetGroupDetailsResponse['createdBy'];
}

export const DescriptionProfile = ({ hostInfo: { nickName, profileImage, userId } }: Props) => {
  return (
    <div className='w-full select-none'>
      <Link href={`/profile/${userId}`} className='flex gap-3'>
        <Image
          width={40}
          className='h-10 w-10 shrink-0 rounded-full'
          alt='프로필 사진'
          draggable={false}
          height={40}
          objectFit='cover'
          src={profileImage ?? DEFAULT_PROFILE_IMAGE}
        />

        <div className='*:line-clamp-1'>
          <p className='text-text-md-semibold text-gray-800'>{nickName}</p>
          <p className='text-text-xs-regular text-gray-600'>some dummy bio text</p>
        </div>
      </Link>
    </div>
  );
};
