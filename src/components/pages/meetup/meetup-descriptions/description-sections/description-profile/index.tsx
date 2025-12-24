import Link from 'next/link';

import { ImageWithFallback } from '@/components/ui';
import { GetGroupDetailsResponse } from '@/types/service/group';

interface Props {
  hostInfo: GetGroupDetailsResponse['createdBy'];
  conditions: {
    isHost: boolean;
    isPast: boolean;
  };
  groupId: number;
}

export const DescriptionProfile = ({
  hostInfo: { userId, nickName, profileImage, profileMessage },
  conditions: { isHost, isPast },
  groupId,
}: Props) => {
  return (
    <div className='flex-between w-full select-none'>
      <Link href={`/profile/${userId}`} className='flex gap-3'>
        <ImageWithFallback
          width={40}
          className='object-fit h-10 w-10 shrink-0 rounded-full'
          alt='프로필 사진'
          draggable={false}
          height={40}
          src={profileImage ?? ''}
        />

        <div className='flex flex-col justify-center *:line-clamp-1'>
          <p className='text-text-md-semibold text-gray-800'>{nickName}</p>
          {profileMessage && <p className='text-text-xs-regular text-gray-600'>{profileMessage}</p>}
        </div>
      </Link>
      {isPast && <p className='text-text-xs-semibold pr-1 text-gray-500'>모임 마감</p>}
      {isHost && !isPast && (
        <Link href={`/post-meetup/${groupId}`} className='text-text-xs-semibold text-mint-500 pr-1'>
          모임 수정하기
        </Link>
      )}
    </div>
  );
};
