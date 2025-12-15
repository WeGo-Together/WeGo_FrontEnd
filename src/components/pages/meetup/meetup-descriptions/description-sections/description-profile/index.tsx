import Link from 'next/link';

import { ImageWithFallback } from '@/components/ui';
import { GetGroupDetailsResponse } from '@/types/service/group';

interface Props {
  hostInfo: GetGroupDetailsResponse['createdBy'];
}

export const DescriptionProfile = ({ hostInfo: { nickName, profileImage, userId } }: Props) => {
  return (
    <div className='w-full select-none'>
      <Link href={`/profile/${userId}`} className='flex gap-3'>
        <ImageWithFallback
          width={40}
          className='object-fit h-10 w-10 shrink-0 rounded-full'
          alt='프로필 사진'
          draggable={false}
          height={40}
          src={profileImage}
        />

        <div className='*:line-clamp-1'>
          <p className='text-text-md-semibold text-gray-800'>{nickName}</p>
          <p className='text-text-xs-regular text-gray-600'>some dummy bio text</p>
        </div>
      </Link>
    </div>
  );
};
