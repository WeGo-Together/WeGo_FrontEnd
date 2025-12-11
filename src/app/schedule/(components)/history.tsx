'use client';

import { useGetMyGroups } from '@/hooks/use-group/use-group-get-my-list';

import { MeetingList } from './meeting-list';

export default function History() {
  const { data, isLoading, error } = useGetMyGroups({ type: 'past', size: 10 });

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-gray-500'>로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-red-500'>데이터를 불러오는 중 오류가 발생했습니다.</div>
      </div>
    );
  }

  return (
    <MeetingList
      emptyStatePath='/'
      emptyStateType='history'
      meetings={data?.items || []}
      showActions={false}
      tabType='history'
    />
  );
}
