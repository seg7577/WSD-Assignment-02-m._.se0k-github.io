import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from '../components/home/Home';
import HomeMain from '../components/home/main/HomeMain';
// import HomeWishlist from '../components/home/wishlist/HomeWishlist';
import HomePopular from '../components/home/popular/HomePopular';
import SignIn from '../components/sign-in/SignIn';
import { useAuth } from '../context/AuthContext';
import MovieWishlist from '../components/movie-wishlist/MovieWishlist';

// AuthGuard 컴포넌트: 인증 상태에 따라 접근 제어하는 것.
const AuthGuard: React.FC = () => {
  const { isAuthenticated } = useAuth(); // AuthContext에서 인증 상태를 가져옴

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* 로그인 페이지 */}
      <Route path="/signin" element={<SignIn />} />

      {/* 인증이 필요한 경로 */}
      <Route element={<AuthGuard />}>
        {/* Home 경로 */}
        <Route path="/" element={<Home />}>
          {/* Home의 기본 자식 컴포넌트 */}
          <Route index element={<HomeMain />} />

          {/* 인기 콘텐츠 경로 */}
          <Route path="popular" element={<HomePopular />} />

          {/* 위시리스트 경로 */}
          <Route path="wishlist" element={<MovieWishlist />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
