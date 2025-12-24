import { createContext, useContext } from 'react';

import { useGetNotificationUnreadCount } from '@/hooks/use-notification';
import { useConnectSSE } from '@/hooks/use-notification/use-notification-connect-sse';

interface NotificationContextType {
  unReadCount: number;
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
  const { data: unReadCount = 0 } = useGetNotificationUnreadCount();
  useConnectSSE();
  return (
    <NotificationContext.Provider value={{ unReadCount: unReadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};
