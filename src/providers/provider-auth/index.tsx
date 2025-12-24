import { createContext, useContext, useEffect, useState } from 'react';

import Cookies from 'js-cookie';

interface AuthContextType {
  accessToken: {
    value: string | null;
    set: (token: string) => void;
    remove: () => void;
  };
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used in AuthProvider');
  return context;
};

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>('');

  const accessToken = {
    value: token,
    set: (token: string) => setToken(token),
    remove: () => setToken(null),
  };

  // 일반 cookie를 사용하고 있기 때문에 useEffect에서 직접 Cookie 읽어오는 방식 적용
  // httpOnly cookie로 변경하게 되면 로직 수정 필요
  useEffect(() => {
    const updateToken = () => {
      const token = Cookies.get('accessToken');
      if (!token) return;
      setToken(token);
    };
    updateToken();
  }, []);

  return <AuthContext.Provider value={{ accessToken }}>{children}</AuthContext.Provider>;
};
