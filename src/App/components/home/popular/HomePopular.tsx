import React, { useState, useEffect } from 'react';
import MovieGrid from '../../movie-grid/MovieGrid';
import MovieInfiniteScroll from '../../movie-infinite-scroll/MovieInfiniteScroll';
import { useAuth } from '../../../context/AuthContext';

import './HomePopular.css';
import '../main/HomeMain';

const HomePopular = () => {
  const [currentView, setCurrentView] = useState<'grid' | 'list'>('grid');
  const [password, setPassword] = useState<string>(''); // 사용자 비밀번호 상태
  const { user } = useAuth(); // 현재 로그인된 사용자 정보 가져오기
  const BASE_URL = 'https://api.themoviedb.org/3'; // 기본 API URL

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 비밀번호를 읽어옴
  useEffect(() => {
    const storedPassword = localStorage.getItem('TMDb-Key');
    if (storedPassword) {
      setPassword(storedPassword); // 상태로 설정
    }

    // 스크롤 막기
    document.body.style.overflow = 'hidden';

    // 컴포넌트 언마운트 시 스크롤 다시 활성화
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // 인기영화 URL 생성
  const fetchPopularMoviesUrl = (page: number = 1) => {
    // 비밀번호를 사용하여 API URL 생성
    return `${BASE_URL}/movie/popular?api_key=${encodeURIComponent(password)}&page=${page}`;
  };

  return (
    <div className="popular-container">
      {/* View 전환 버튼 */}

      <header className="header">
        <h1>Popular Movies</h1>
      </header>

      <div className="view-toggle">
        <button
          onClick={() => setCurrentView('grid')}
          className={currentView === 'grid' ? 'active' : ''}
        >
          <span>Grid</span>
        </button>
        <button
          onClick={() => setCurrentView('list')}
          className={currentView === 'list' ? 'active' : ''}
        >
          <span>List</span>
        </button>
      </div>

      {/* Grid View */}
      {currentView === 'grid' && (
        <MovieGrid
          fetchUrl={fetchPopularMoviesUrl()} // URL에 비밀번호 포함
          rowSize={8}
          getImageUrl={(path: string) =>
            `https://image.tmdb.org/t/p/original${path}`
          }
          toggleWishlist={(movie: any) => console.log('Toggle Wishlist', movie)}
          isInWishlist={(id: number) => false} // 위시리스트 로직
        />
      )}

      {/* List View (Infinite Scroll) */}
      {currentView === 'list' && (
        <MovieInfiniteScroll
          fetchUrl={fetchPopularMoviesUrl()} // URL에 비밀번호 포함
          rowSize={5}
          getImageUrl={(path: string) =>
            `https://image.tmdb.org/t/p/original${path}`
          }
          toggleWishlist={(movie: any) => console.log('Toggle Wishlist', movie)}
          isInWishlist={(id: number) => false}
        />
      )}
    </div>
  );
};

export default HomePopular;
