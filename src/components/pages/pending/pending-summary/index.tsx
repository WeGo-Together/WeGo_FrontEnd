'use client';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { DEFAULT_GROUP_IMAGE } from 'constants/default-images';

import { API } from '@/api';
import { ImageWithFallback } from '@/components/ui';
import { GetJoinRequestsResponse } from '@/types/service/group';

interface Props {
  groupId: string;
  initialData?: GetJoinRequestsResponse;
}

export const GroupPendingSummary = ({ groupId, initialData }: Props) => {
  const { data } = useQuery<GetJoinRequestsResponse>({
    queryKey: ['joinRequests', groupId, 'PENDING'],
    queryFn: () => API.groupService.getJoinRequests({ groupId }, 'PENDING'),
    initialData,
  });

  const pendingCount = data?.count ?? 0;
  const title = data?.groupTitle ?? '';
  const thumbnail = data?.thumbnail100x100Url ?? null;

  return (
    <Link
      href={`/group/${groupId}`}
      className='flex h-22 items-center gap-3 border-b border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50 active:bg-gray-100'
    >
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
    </Link>
  );
};
