'use client';
import { useEffect } from 'react';

import { useAuthStore } from '@/stores';

interface Props {
  children: React.ReactNode;
  hasRefreshToken: boolean;
}

export const AuthProvider = ({ children, hasRefreshToken }: Props) => {
  const { setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    setIsAuthenticated(hasRefreshToken);
  }, [hasRefreshToken, setIsAuthenticated]);

  return <>{children}</>;
};
