'use client';

import { NotificationCard } from '@/components/pages/notification';
import { useGetNotificationsInfinite } from '@/hooks/use-notification/use-notification-get-list';

export default function NotificationPage() {
  const { data: notificationList, fetchNextPage } = useGetNotificationsInfinite({ size: 1 });

  if (!notificationList) return;

  return (
    <section>
      <div className='flex h-10 flex-row items-center justify-end gap-2'>
        <p className='text-mono-white bg-mint-500 flex-center size-4 rounded-full'>v</p>
        <p className='text-mono-black text-text-sm mr-3 text-right'>모두 읽음 처리</p>
      </div>
      {notificationList.map((item, idx) => (
        <NotificationCard key={idx} item={item} />
      ))}
      <button className='text-black' onClick={() => fetchNextPage()}>
        다음
      </button>
    </section>
  );
}
