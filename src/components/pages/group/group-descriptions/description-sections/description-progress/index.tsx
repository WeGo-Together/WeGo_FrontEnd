import { useEffect, useState } from 'react';

import { formatTimeAgo } from '@/lib/formatDateTime';
import { GetGroupDetailsResponse } from '@/types/service/group';

interface Props {
  progress: {
    maxParticipants: GetGroupDetailsResponse['maxParticipants'];
    participantCount: GetGroupDetailsResponse['participantCount'];
  };
  createdAt: GetGroupDetailsResponse['createdAt'];
}

export const DescriptionProgress = ({
  progress: { maxParticipants, participantCount },
  createdAt,
}: Props) => {
  const [timeAgo, setTimeAgo] = useState<string | null>(null);
  const progressRate = Math.ceil((participantCount / maxParticipants) * 100);

  useEffect(() => {
    setTimeAgo(formatTimeAgo(createdAt));
  }, [createdAt]);

  return (
    <div className='mt-6 select-none'>
      <div className='space-y-1 rounded-2xl border border-gray-300 bg-gray-50 px-4 py-[14px]'>
        <div className='flex-between'>
          <p className='text-text-xs-medium text-gray-700'>참여 인원</p>
          <span className='text-mint-600 text-text-xs-semibold'>
            {participantCount}/{maxParticipants}
          </span>
        </div>
        <div className='h-2 w-full overflow-hidden rounded-full bg-gray-300'>
          <span className='bg-mint-500 block h-2' style={{ width: `${progressRate}%` }} />
        </div>
      </div>

      <div className='mt-4'>
        <p className='text-text-xs-medium h-4.5 text-right text-gray-500'>{timeAgo}</p>
      </div>
    </div>
  );
};
