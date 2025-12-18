import React, { createContext, useContext } from 'react';

import Cookies from 'js-cookie';

interface TokenContextType {
  token: string;
}

const TokenContext = createContext<TokenContextType | null>(null);

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) throw new Error('useNotification must be used in NotificationProvider');
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const TokenProvider = ({ children }: NotificationProviderProps) => {
  const token = Cookies.get('accessToken') || '';

  return <TokenContext.Provider value={{ token }}>{children}</TokenContext.Provider>;
};
