import React, { useState } from 'react';
import MovieGrid from '../../movie-grid/MovieGrid';
import MovieInfiniteScroll from '../../movie-infinite-scroll/MovieInfiniteScroll';
import './HomePopular.css';

const HomePopular = () => {
  const [currentView, setCurrentView] = useState<'grid' | 'list'>('grid');

  const fetchPopularMoviesUrl = () => {
    // 실제 데이터를 반환하도록 수정
    return '/api/popular-movies'; // 실제 API URL
  };

  return (
    <div className="popular-container">
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
          fetchUrl={fetchPopularMoviesUrl()} // 데이터 URL 전달
          rowSize={5} // 페이지당 영화 수
          getImageUrl={(path: string) =>
            `https://image.tmdb.org/t/p/original${path}`
          }
          toggleWishlist={(movie: any) => console.log('Toggle Wishlist', movie)}
          isInWishlist={(id: number) => false} // 실제 위시리스트 로직 필요
        />
      )}

      {currentView === 'list' && (
        <MovieInfiniteScroll
          fetchUrl={fetchPopularMoviesUrl()} // 데이터 URL 전달
          rowSize={5}
          getImageUrl={(path: string) =>
            `https://image.tmdb.org/t/p/original${path}`
          }
          toggleWishlist={(movie: any) => console.log('Toggle Wishlist', movie)}
          isInWishlist={(id: number) => false} // 실제 위시리스트 로직 필요
        />
      )}
    </div>
  );
};

export default HomePopular;
