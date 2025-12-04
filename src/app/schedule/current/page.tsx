import { TabNavigation } from '@/components/shared';

import { SCHEDULE_TABS } from '../constants';

export default function ScheduleCurrentPage() {
  return (
    <div className='min-h-screen bg-[#F1F5F9]'>
      <TabNavigation tabs={SCHEDULE_TABS} />
      <section className='flex w-full flex-col gap-4 px-4 py-4'>
        <h2 className='text-h2-bold'>현재 모임 페이지</h2>
      </section>
    </div>
  );
}
