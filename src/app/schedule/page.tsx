'use client';

import { useSearchParams } from 'next/navigation';

import { Suspense } from 'react';

import { TabNavigation } from '@/components/shared';

import Current from './_components/current';
import History from './_components/history';
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

export default function SchedulePage() {
  return (
    <div className='min-h-screen bg-[#F1F5F9]'>
      <TabNavigation basePath='/schedule' tabs={SCHEDULE_TABS} />

      <Suspense fallback={null}>
        <ScheduleContent />
      </Suspense>
    </div>
  );
}
