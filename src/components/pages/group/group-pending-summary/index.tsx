'use client';

import { DEFAULT_GROUP_IMAGE } from 'constants/default-images';

import { ImageWithFallback } from '@/components/ui';

interface Props {
  thumbnail?: string | null;
  title?: string;
  pendingCount?: number;
}

const MOCK_DATA = {
  thumbnail: null,
  title: '매우 긴 제목을 가진 모임입니다 이 제목은 너무 길어서 잘려야 합니다',
  pendingCount: 5,
};

export const GroupPendingSummary = ({
  thumbnail = MOCK_DATA.thumbnail,
  title = MOCK_DATA.title,
  pendingCount = MOCK_DATA.pendingCount,
}: Props) => {
  return (
    <div className='flex h-[88px] items-center gap-3 border-b border-gray-200 bg-white p-4'>
      <div className='relative h-14 w-14 shrink-0 overflow-hidden rounded-[10px] bg-gray-200'>
        <ImageWithFallback
          width={56}
          className='h-full w-full object-cover'
          alt={title || '모임 썸네일'}
          fallbackSrc={DEFAULT_GROUP_IMAGE}
          height={56}
          src={thumbnail ?? ''}
          unoptimized
        />
      </div>

      <div className='flex min-w-0 flex-1 flex-col justify-between'>
        <h3 className='text-text-md-semibold mt-[5px] h-6 truncate text-gray-800'>{title}</h3>

        <div className='text-text-sm-medium mb-[5px] flex h-5 items-center'>
          <span className='text-gray-600'>신청한 유저</span>
          <span className='text-mint-600 ml-1'>{pendingCount}</span>
          <span className='text-gray-600'>명</span>
        </div>
      </div>
    </div>
  );
};
