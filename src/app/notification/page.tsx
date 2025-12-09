'use client';

import { NotificationCard } from '@/components/pages/notification';
import { useNotifications } from '@/hooks/use-notifications';

export default function NotificationPage() {
  const messages = useNotifications();

  return (
    <section>
      {messages.map((data, idx) => (
        <NotificationCard key={idx} data={data} />
      ))}
    </section>
  );
}
