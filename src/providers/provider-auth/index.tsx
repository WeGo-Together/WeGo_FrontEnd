import React, { createContext, SetStateAction, useContext, useState } from 'react';

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
  const [isAuthenticated, setIsAuthenticated] = useState(hasRefreshToken);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
