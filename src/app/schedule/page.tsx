'use client';

import { useSearchParams } from 'next/navigation';

import { Suspense } from 'react';

import { TabNavigation } from '@/components/shared';
import { CardSkeleton } from '@/components/shared/card/card-skeleton';
import { GROUP_LIST_PAGE_SIZE } from '@/lib/constants/group-list';

import Current from './_components/current';
import History from './_components/history';
import { SCHEDULE_MIN_HEIGHT } from './_components/meetings/constants';
import My from './_components/my';

const SCHEDULE_TABS = [
  { label: '현재 모임', value: 'current' },
  { label: '나의 모임', value: 'myPost' },
  { label: '모임 이력', value: 'past' },
];

const ScheduleContent = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'current';

  return (
    <>
      {tab === 'current' && <Current />}
      {tab === 'myPost' && <My />}
      {tab === 'past' && <History />}
    </>
  );
};

const ScheduleSkeleton = () => (
  <section className={`${SCHEDULE_MIN_HEIGHT} bg-[#F1F5F9]`}>
    <div className='flex w-full flex-col px-4 py-4'>
      <div className='flex w-full flex-col gap-4'>
        {Array.from({ length: GROUP_LIST_PAGE_SIZE }).map((_, i) => (
          <CardSkeleton key={i} showButtons={true} />
        ))}
      </div>
    </div>
  </section>
);

export default function SchedulePage() {
  return (
    <div className='min-h-screen bg-[#F1F5F9]'>
      <TabNavigation basePath='/schedule' tabs={SCHEDULE_TABS} />

      <Suspense fallback={<ScheduleSkeleton />}>
        <ScheduleContent />
      </Suspense>
    </div>
  );
}
