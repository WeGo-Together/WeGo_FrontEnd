'use client';

import { useSearchParams } from 'next/navigation';

import { Suspense } from 'react';

import { Current, MyPost, Past, ScheduleSkeleton } from '@/components/pages/schedule';
import { TabNavigation } from '@/components/shared';

export default function SchedulePage() {
  const searchParams = useSearchParams();
  const tab = (searchParams.get('tab') || 'current') as 'current' | 'myPost' | 'past';

  return (
    <div className='bg-gray-100'>
      <TabNavigation basePath='/schedule' tabs={SCHEDULE_TABS} />
      <Suspense fallback={<ScheduleSkeleton tab={tab} />}>{SCHEDULE_CONTENTS[tab]}</Suspense>
    </div>
  );
}

const SCHEDULE_CONTENTS = {
  current: <Current />,
  myPost: <MyPost />,
  past: <Past />,
};

const SCHEDULE_TABS = [
  { label: '현재 모임', value: 'current' },
  { label: '나의 모임', value: 'myPost' },
  { label: '모임 이력', value: 'past' },
];
