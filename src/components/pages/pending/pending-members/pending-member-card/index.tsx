'use client';

import Link from 'next/link';

import { Button, ImageWithFallback } from '@/components/ui';
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
    <div className='bg-mono-white rounded-3xl px-5 py-[26px] shadow-sm'>
      <Link href={profileUrl} className='flex gap-3'>
        <ImageWithFallback
          width={40}
          className='object-fit h-10 w-10 shrink-0 rounded-full'
          alt={`${member.nickName} 프로필`}
          draggable={false}
          height={40}
          src={member.profileImage ?? ''}
        />

        <div className='min-w-0 flex-1'>
          <h4 className='text-text-md-semibold h-6 text-gray-800'>{member.nickName}</h4>
        </div>
      </Link>

      {member.joinRequestMessage && (
        <p className='text-text-md-medium mt-4 line-clamp-2 max-h-12 min-h-6 text-gray-600'>
          {member.joinRequestMessage}
        </p>
      )}

      <div className='mt-4 flex gap-2'>
        <Button className='flex-1' size='sm' variant='tertiary' onClick={onReject}>
          거절하기
        </Button>
        <Button
          className='bg-mint-500 text-text-sm-bold text-mono-white hover:bg-mint-600 active:bg-mint-700 flex-1'
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
