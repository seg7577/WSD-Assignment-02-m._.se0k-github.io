import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AuthService } from '../util/auth/authService';

interface AuthContextType {
  user: any; // 현재 로그인된 사용자 정보를 저장
  login: (email: string, password: string) => Promise<void>; // 로그인 함수
  register: (email: string, password: string) => Promise<void>; // 회원가입 함수
  logout: () => void; // 로그아웃 함수
  isAuthenticated: boolean; // 로그인 상태
  setIsAuthenticated: (value: boolean) => void; // 로그인 상태 갱신 함수
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    const loggedInUser = await AuthService.tryLogin(email, password);
    setUser(loggedInUser);
    setIsAuthenticated(true);
  };

  const register = async (email: string, password: string) => {
    await AuthService.tryRegister(email, password);
  };

  const logout = () => {
    localStorage.removeItem('TMDb-Key');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated, // 추가
        setIsAuthenticated, // 추가
      }}
    >
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
