'use client';
import { useEffect, useState } from 'react';

import { Notification } from '@/types/service/notification';

export const useNotifications = () => {
  const [messages, setMessages] = useState<Notification[]>([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/notifications/stream');

    eventSource.onmessage = (event) => {
      const data: Notification = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    eventSource.onerror = (err) => {
      console.error('SSE 에러', err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return messages;
};
