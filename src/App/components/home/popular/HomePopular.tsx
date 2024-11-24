import React, { useState, useEffect } from 'react';
import MovieGrid from '../../movie-grid/MovieGrid';
import MovieInfiniteScroll from '../../movie-infinite-scroll/MovieInfiniteScroll';
import { useAuth } from '../../../context/AuthContext';

import './HomePopular.css';
import '../main/HomeMain';

const HomePopular = () => {
  const [currentView, setCurrentView] = useState<'grid' | 'list'>('grid');
  const [password, setPassword] = useState<string>(''); // 사용자 비밀번호 상태
  const { user } = useAuth();
  const BASE_URL = 'https://api.themoviedb.org/3';

  const [wishlist, setWishlist] = useState<number[]>([]);

  // 로컬 스토리지에서 위시리스트를 로드
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(savedWishlist);
  }, []);

  // 로컬 스토리지에 위시리스트를 저장
  const updateWishlistInLocalStorage = (updatedWishlist: number[]) => {
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  // 위시리스트 추가/제거
  const toggleWishlist = (movie: { id: number }) => {
    const isMovieInWishlist = wishlist.includes(movie.id);
    const updatedWishlist = isMovieInWishlist
      ? wishlist.filter((id) => id !== movie.id)
      : [...wishlist, movie.id];

    setWishlist(updatedWishlist);
    updateWishlistInLocalStorage(updatedWishlist);
  };

  // 위시리스트 확인
  const isInWishlist = (id: number) => wishlist.includes(id);

  useEffect(() => {
    const storedPassword = localStorage.getItem('TMDb-Key');
    if (storedPassword) {
      setPassword(storedPassword);
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const fetchPopularMoviesUrl = (page: number = 1) => {
    return `${BASE_URL}/movie/popular?api_key=${encodeURIComponent(password)}&page=${page}`;
  };

  return (
    <div className="popular-container">
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

      {currentView === 'grid' && (
        <MovieGrid
          fetchUrl={fetchPopularMoviesUrl()}
          rowSize={8}
          getImageUrl={(path: string) =>
            `https://image.tmdb.org/t/p/original${path}`
          }
          toggleWishlist={toggleWishlist}
          isInWishlist={isInWishlist}
        />
      )}

      {currentView === 'list' && (
        <MovieInfiniteScroll
          fetchUrl={fetchPopularMoviesUrl()}
          getImageUrl={(path: string) =>
            `https://image.tmdb.org/t/p/original${path}`
          }
          toggleWishlist={toggleWishlist}
          isInWishlist={isInWishlist}
        />
      )}
    </div>
  );
};

export default HomePopular;
