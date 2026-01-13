'use client';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import { API } from '@/api';
import { GroupImage } from '@/components/shared';
import { groupKeys } from '@/lib/query-key/query-key-group';
import { GetJoinRequestsResponse } from '@/types/service/group';

interface Props {
  groupId: string;
  initialData?: GetJoinRequestsResponse;
}

export const GroupPendingSummary = ({ groupId, initialData }: Props) => {
  const { data } = useQuery<GetJoinRequestsResponse>({
    queryKey: groupKeys.joinRequests(groupId, 'PENDING'),
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
      <GroupImage className='shrink-0' size='sm' src={thumbnail} />

      <div className='min-w-0 space-y-0.5'>
        <h3 className='text-text-md-semibold h-6 truncate text-gray-800'>{title}</h3>

        <div className='text-text-sm-medium flex h-5 items-center'>
          <span className='text-gray-600'>신청한 유저</span>
          <span className='text-mint-600 ml-1'>{pendingCount}</span>
          <span className='text-gray-600'>명</span>
        </div>
      </div>
    </Link>
  );
};
