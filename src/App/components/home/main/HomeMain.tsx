import React from 'react';

import Banner from '../../banner/Banner';
import MovieRow from '../../movie-row/MovieRow';
import './HomeMain.css'; // 스타일 가져오기
<<<<<<< HEAD
//develop.yml 확인용
=======
//homeMain branch create
>>>>>>> feature/homeMain
const HomeMain = () => {
  // 배너에 표시할 대표 영화 데이터
  const featuredMovie = {
    title: '베놈: 라스트 댄스',
    overview: '환상의 케미스트리의 에디 브록과 심비오트 베놈...',
    backdropUrl: '/venom-backdrop.jpg',
  };

  // API URL (TMDB API 기반)
  const popularMoviesUrl =
    'https://api.themoviedb.org/3/movie/popular?api_key=871517dfdbe2bcf7907af69d5f74d916';
  const newReleasesUrl =
    'https://api.themoviedb.org/3/movie/now_playing?api_key=871517dfdbe2bcf7907af69d5f74d916';
  const actionMoviesUrl =
    'https://api.themoviedb.org/3/discover/movie?api_key=871517dfdbe2bcf7907af69d5f74d916&with_genres=28';

  // 이미지 URL 생성 함수
  const getImageUrl = (path: string) =>
    `https://image.tmdb.org/t/p/original${path}`;

  // 위시리스트 토글 함수
  const toggleWishlist = (movie: any) => {
    console.log('Toggle Wishlist:', movie);
    // 실제 로직은 여기 추가
  };

  // 위시리스트 상태 확인 함수
  const isInWishlist = (id: number) => {
    return false; // 위시리스트 로직에 따라 구현 필요
  };

  return (
    <div className="home-main">
      {/* 배너 컴포넌트 */}
      <Banner movie={featuredMovie} />

      {/* 영화 슬라이더 컴포넌트 */}
      <MovieRow
        title="인기 영화"
        fetchUrl={popularMoviesUrl}
        getImageUrl={getImageUrl}
        toggleWishlist={toggleWishlist}
        isInWishlist={isInWishlist}
      />
      <MovieRow
        title="최신 영화"
        fetchUrl={newReleasesUrl}
        getImageUrl={getImageUrl}
        toggleWishlist={toggleWishlist}
        isInWishlist={isInWishlist}
      />
      <MovieRow
        title="액션 영화"
        fetchUrl={actionMoviesUrl}
        getImageUrl={getImageUrl}
        toggleWishlist={toggleWishlist}
        isInWishlist={isInWishlist}
      />
    </div>
  );
};

export default HomeMain;
