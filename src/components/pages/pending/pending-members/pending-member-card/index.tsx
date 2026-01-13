'use client';

import Link from 'next/link';

import { ProfileImage } from '@/components/shared';
import { Button } from '@/components/ui';
import { GetJoinRequestsResponse } from '@/types/service/group';

type JoinRequestItem = GetJoinRequestsResponse['items'][number];

interface Props {
  member: JoinRequestItem;
  onReject: () => void;
  onApprove: () => void;
}

export const PendingMemberCard = ({ member, onReject, onApprove }: Props) => {
  const profileUrl = `/profile/${member.userId}`;

  return (
    <div className='bg-mono-white rounded-3xl px-5 py-6.5 shadow-sm'>
      <Link href={profileUrl} className='flex items-center gap-3'>
        <ProfileImage className='shrink-0' size='sm' src={member.profileImage} />

        <h4 className='text-text-md-semibold truncate text-gray-800'>{member.nickName}</h4>
      </Link>

      {member.joinRequestMessage && (
        <p className='text-text-md-medium mt-4 line-clamp-2 max-h-12 min-h-6 break-all text-gray-600'>
          {member.joinRequestMessage}
        </p>
      )}

      <div className='mt-4 flex gap-2'>
        <Button size='sm' variant='tertiary' onClick={onReject}>
          거절하기
        </Button>
        <Button
          className='bg-mint-500 text-text-sm-bold text-mono-white hover:bg-mint-600 active:bg-mint-700'
          size='sm'
          variant='primary'
          onClick={onApprove}
        >
          수락하기
        </Button>
      </div>
    </div>
  );
};
