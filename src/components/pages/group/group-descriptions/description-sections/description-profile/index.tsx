import Link from 'next/link';

import { ProfileImage } from '@/components/shared';
import { PendingBadge } from '@/components/ui';
import { GetGroupDetailsResponse } from '@/types/service/group';

interface Props {
  hostInfo: GetGroupDetailsResponse['createdBy'];
  groupId: number;
  conditions: {
    isHost: boolean;
    isPending: boolean;
    isFinished: boolean;
  };
}

export const DescriptionProfile = ({
  hostInfo: { userId, nickName, profileImage, profileMessage },
  conditions: { isHost, isPending, isFinished },
  groupId,
}: Props) => {
  const isEditable = isHost && !isFinished;

  return (
    <div className='flex-between w-full select-none'>
      <Link href={`/profile/${userId}`} className='flex gap-3'>
        <ProfileImage size='sm' src={profileImage} />
        <div className='flex flex-col justify-center *:line-clamp-1'>
          <p className='text-text-md-semibold text-gray-800'>{nickName}</p>
          {profileMessage && <p className='text-text-xs-regular text-gray-600'>{profileMessage}</p>}
        </div>
      </Link>
      {isFinished && <p className='text-text-xs-semibold pr-1 text-gray-500'>모임 마감</p>}
      {isPending && <PendingBadge children={'대기중'} variant='md' />}
      {isEditable && (
        <Link
          href={`/create-group/${groupId}`}
          className='text-text-xs-semibold text-mint-500 pr-1'
        >
          모임 수정하기
        </Link>
      )}
    </div>
  );
};
