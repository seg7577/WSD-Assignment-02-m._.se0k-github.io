import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AuthService } from '../util/auth/auth.service';

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  const login = async (email: string, password: string) => {
    const loggedInUser = await AuthService.tryLogin(email, password);
    setUser(loggedInUser); // 로그인 성공 시 사용자 정보 저장
  };

  const register = async (email: string, password: string) => {
    await AuthService.tryRegister(email, password);
  };

  const logout = () => {
    localStorage.removeItem('TMDb-Key'); // 로컬 스토리지에서 키 삭제
    setUser(null); // 사용자 정보 제거
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
