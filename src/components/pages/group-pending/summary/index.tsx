'use client';

import { GroupImage } from '@/components/shared';

interface Props {
  thumbnail: string | null;
  title?: string;
  pendingCount?: number;
}

export const GroupPendingSummary = ({ thumbnail, title, pendingCount }: Props) => {
  return (
    <div className='flex h-22 items-center gap-3 border-b border-gray-200 bg-white p-4'>
      <GroupImage className='shrink-0' size='sm' src={thumbnail} />

      <div className='min-w-0 space-y-0.5'>
        <h3 className='text-text-md-semibold h-6 truncate text-gray-800'>{title}</h3>

        <div className='text-text-sm-medium flex h-5 items-center'>
          <span className='text-gray-600'>신청한 유저</span>
          <span className='text-mint-600 ml-1'>{pendingCount}</span>
          <span className='text-gray-600'>명</span>
        </div>
      </div>
    </div>
  );
};
