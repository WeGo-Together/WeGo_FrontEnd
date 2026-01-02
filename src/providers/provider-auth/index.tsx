import React, { createContext, SetStateAction, useContext, useEffect, useState } from 'react';

import Cookies from 'js-cookie';

import { API } from '@/api';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used in AuthProvider');
  return context;
};

interface Props {
  children: React.ReactNode;
  hasRefreshToken: boolean;
}

export const AuthProvider = ({ children, hasRefreshToken }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 초기값 설정
  // 페이지가 새로고침 될 때 accessToken이 없으면 refresh 시도, state update 실행
  useEffect(() => {
    const updateAuthenticated = async () => {
      const hasAccessToken = !!Cookies.get('accessToken');
      if (!hasAccessToken && hasRefreshToken) {
        try {
          await API.authService.refresh();
          setIsAuthenticated(true);
        } catch {
          setIsAuthenticated(false);
        }
      } else if (hasAccessToken) {
        setIsAuthenticated(true);
      }
    };
    updateAuthenticated();
  }, [hasRefreshToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
