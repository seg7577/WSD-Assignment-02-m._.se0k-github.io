import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/home/Home';
import HomeMain from './components/home/main/HomeMain';
// import HomeWishlist from './components/home/wishlist/HomeWishlist';
import HomePopular from './components/home/popular/HomePopular';
import SignIn from './components/sign-in/SignIn';
import PrivateRoute from './privateRoute'; // PrivateRoute 컴포넌트
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthProvider } from './context/AuthContext';
import ToastContainer from './components/layout/toast/ToastContainer';
import MovieWishlist from './components/\bmovie/movie-wishlist/MovieWishlist';
import HomeSearch from './components/home/search/HomeSearch';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
        {/* ToastContainer는 모든 컴포넌트에서 Toast를 사용할 수 있도록 최상단에 배치 */}
        <ToastContainer />

        {/* Header 컴포넌트는 모든 페이지에서 공통적으로 사용 */}
        <Header />

        {/* Routes로 SPA 방식의 라우팅 설정 */}
        <Routes>
          {/* 로그인 페이지 */}
          <Route path="/signin" element={<SignIn />} />
          
          {/* 보호된 경로 */}
          <Route element={<PrivateRoute />}>
            {/* Home 컴포넌트를 부모로 설정 */}
            <Route path="/" element={<Home />}>
              {/* 기본 자식 경로 */}
              <Route index element={<HomeMain />} />

              {/* 인기 콘텐츠 경로 */}
              <Route path="popular" element={<HomePopular />} />

              {/* 위시리스트 경로 */}
              <Route path="wishlist" element={<MovieWishlist />} />

              <Route path="search" element={<HomeSearch />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
