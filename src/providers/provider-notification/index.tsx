import { createContext, useContext, useEffect } from 'react';

import { useGetNotificationUnreadCount } from '@/hooks/use-notification';
import { useConnectSSE } from '@/hooks/use-notification/use-notification-connect-sse';

interface NotificationContextType {
  unReadCount: number;
  receivedNewNotification: boolean;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used in NotificationProvider');
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
  hasRefreshToken: boolean;
}

export const NotificationProvider = ({ children, hasRefreshToken }: NotificationProviderProps) => {
  const { data: unReadCount = 0 } = useGetNotificationUnreadCount();
  const { receivedNewNotification, connect, disconnect } = useConnectSSE(hasRefreshToken);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);
  return (
    <NotificationContext.Provider value={{ unReadCount, receivedNewNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
