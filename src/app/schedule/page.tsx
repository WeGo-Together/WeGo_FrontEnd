'use client';

import { useSearchParams } from 'next/navigation';

import { Suspense } from 'react';

import { TabNavigation } from '@/components/shared';

import Current from './(components)/current';
import History from './(components)/history';
import My from './(components)/my';

const SCHEDULE_TABS = [
  { label: '현재 모임', value: 'current' },
  { label: '나의 모임', value: 'my' },
  { label: '모임 이력', value: 'history' },
];

const ScheduleContent = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'current';

  return (
    <>
      {tab === 'current' && <Current />}
      {tab === 'my' && <My />}
      {tab === 'history' && <History />}
    </>
  );
};

export default function SchedulePage() {
  return (
    <div className='min-h-screen bg-[#F1F5F9]'>
      <Suspense fallback={null}>
        <TabNavigation basePath='/schedule' tabs={SCHEDULE_TABS} />
      </Suspense>

      <Suspense fallback={null}>
        <ScheduleContent />
      </Suspense>
    </div>
  );
}
