'use client';

import { EmptyState } from '@/components/layout/empty-state';
import { NotificationCard, NotificationHeader } from '@/components/pages/notification';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useGetNotificationsInfinite } from '@/hooks/use-notification/use-notification-get-list';

export default function NotificationPage() {
  const {
    data: list,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetNotificationsInfinite({ size: 20 });

  const fetchObserverRef = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  if (!list) return;

  return (
    <section>
      <NotificationHeader />
      {list.length > 0 && list.map((item) => <NotificationCard key={item.id} item={item} />)}
      {hasNextPage && <div ref={fetchObserverRef}>다음</div>}
      {list.length === 0 && <EmptyState>아직 받은 알림이 없어요.</EmptyState>}
    </section>
  );
}
