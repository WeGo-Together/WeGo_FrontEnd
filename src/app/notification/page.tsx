'use client';

import { EmptyState } from '@/components/layout/empty-state';
import { NotificationCard, NotificationHeader } from '@/components/pages/notification';
import { useGetNotificationsInfinite } from '@/hooks/use-notification/use-notification-get-list';

export default function NotificationPage() {
  const { data: list, fetchNextPage } = useGetNotificationsInfinite({ size: 1 });

  if (!list) return;

  return (
    <section>
      <NotificationHeader />
      <div className='flex h-10 flex-row items-center justify-end gap-2'>
        <p className='text-mono-white bg-mint-500 flex-center size-4 rounded-full'>v</p>
        <p className='text-mono-black text-text-sm mr-3 text-right'>모두 읽음 처리</p>
      </div>

      {list.length > 0 && list.map((item) => <NotificationCard key={item.id} item={item} />)}
      {list.length === 0 && <EmptyState>아직 받은 알림이 없어요.</EmptyState>}
      <button className='text-black' onClick={() => fetchNextPage()}>
        다음
      </button>
    </section>
  );
}
