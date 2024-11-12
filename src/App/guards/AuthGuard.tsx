import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  if (!isAuthenticated) {
    // 인증되지 않은 경우 로그인 페이지로 리다이렉트
    return <Navigate to="/signin" />;
  }

  // 인증된 경우 하위 라우트를 렌더링
  return <Outlet />;
};

export default AuthGuard;
