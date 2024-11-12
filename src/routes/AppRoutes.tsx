import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthGuard from '../guards/AuthGuard';
import Home from '../components/home/Home';
import SignIn from '../components/sign-in/SignIn';
const AppRoutes = () => {
  const isAuthenticated = false; // 실제 인증 로직으로 대체

  return (
    <Routes>
      {/* 인증된 사용자만 접근 가능 */}
      <Route element={<AuthGuard isAuthenticated={isAuthenticated} />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* 인증이 필요하지 않은 페이지 */}
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};

export default AppRoutes;
