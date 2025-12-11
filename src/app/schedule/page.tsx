'use client';

import { useSearchParams } from 'next/navigation';

import { Suspense } from 'react';

import { TabNavigation } from '@/components/shared';

import Current from './(components)/current';
import History from './(components)/history';
import My from './(components)/my';

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

// 나중에 api 연동할 때
// 1. ScheduleContent를 감싸던 임시 Suspense 제거해야됨
// 2. useSearchParams()는 그대로 유지
// 3. Current, My, History를 서버 컴포넌트로 변경 (use client 제거) - 서버에서 데이터 페칭
