import React, { createContext, useState, useContext, ReactNode } from 'react';
// React와 관련된 도구를 가져옵니다.
// - createContext: Context 객체를 생성하기 위해 사용
// - useState: 상태 관리를 위해 사용
// - useContext: Context를 사용하기 위해 가져옴
// - ReactNode: JSX에서 사용할 수 있는 모든 요소를 포함하는 타입

import { AuthService } from '../util/auth/auth.service';
// AuthService를 가져옵니다. 로그인 및 회원가입 로직이 정의된 서비스입니다.

interface AuthContextType {
  user: any; // 현재 로그인된 사용자 정보를 저장
  login: (email: string, password: string) => Promise<void>; // 로그인 함수의 타입 정의
  register: (email: string, password: string) => Promise<void>; // 회원가입 함수의 타입 정의
  logout: () => void; // 로그아웃 함수의 타입 정의
}
// AuthContext에서 사용할 데이터와 함수들의 타입을 정의합니다.

const AuthContext = createContext<AuthContextType | null>(null);
// Context 객체를 생성합니다. 초기값은 null로 설정합니다.

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // AuthProvider 컴포넌트를 정의합니다.
  // - children: AuthProvider로 감싸진 컴포넌트들을 의미

  const [user, setUser] = useState<any>(null);
  // 현재 로그인된 사용자 정보를 저장하는 상태입니다. 초기값은 null로 설정하여 비로그인 상태를 나타냅니다.

  const login = async (email: string, password: string) => {
    // 로그인 함수
    const loggedInUser = await AuthService.tryLogin(email, password);
    // AuthService의 tryLogin 메서드를 호출하여 로그인 시도.
    // 성공하면 로그인된 사용자 정보를 loggedInUser에 저장.
    setUser(loggedInUser);
    // 로그인 성공 시 사용자 정보를 상태로 저장합니다.
  };

  const register = async (email: string, password: string) => {
    // 회원가입 함수
    await AuthService.tryRegister(email, password);
    // AuthService의 tryRegister 메서드를 호출하여 회원가입을 처리합니다.
  };

  const logout = () => {
    // 로그아웃 함수
    localStorage.removeItem('TMDb-Key');
    // 로컬 스토리지에서 'TMDb-Key'를 삭제하여 사용자 세션 정보를 제거합니다.
    setUser(null);
    // 사용자 정보를 null로 설정하여 로그아웃 상태로 변경합니다.
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {/* AuthContext.Provider를 통해 AuthContext의 값을 하위 컴포넌트에 제공합니다. */}
      {children}
      {/* children: AuthProvider로 감싸진 컴포넌트들을 렌더링 */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  // AuthContext를 사용하기 쉽게 만든 커스텀 훅입니다.
  const context = useContext(AuthContext);
  // useContext를 통해 AuthContext의 값을 가져옵니다.

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
    // AuthProvider 내부가 아닌 곳에서 useAuth를 호출하면 오류를 발생시킵니다.
  }

  return context;
  // AuthContext의 값을 반환합니다.
};
