import React, { createContext, useContext, useEffect, useState } from 'react';

import { Notification } from '@/types/service/notification';

import { useToken } from '../provider-token';

interface NotificationContextType {
  notificationData: Notification | null;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used in NotificationProvider');
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notificationData, setNotificationData] = useState<Notification | null>(null);

  const { token } = useToken();

  useEffect(() => {
    if (!token) return;
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/subscribe?accessToken=${token}`,
    );

    eventSource.onopen = () => {
      console.log('SSE 연결 열림');
    };

    eventSource.addEventListener('connect', (event) => {
      console.log('SSE 연결 확인:', event.data);
    });

    eventSource.addEventListener('notification', (event) => {
      const data = JSON.parse(event.data);
      setNotificationData(data);
    });

    eventSource.onerror = (error) => {
      console.error('SSE 에러:', error);
      console.log('readyState:', eventSource.readyState);
    };

    return () => {
      eventSource.close();
    };
  }, [token]);

  return (
    <NotificationContext.Provider value={{ notificationData }}>
      {children}
    </NotificationContext.Provider>
  );
};
