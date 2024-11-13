import React from 'react';

import Banner from '../../banner/Banner';
import MovieRow from '../../movie-row/MovieRow';
import './HomeMain.css'; // 스타일 가져오기

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
      {/* 홈 메인 컴포넌트를 감싸는 컨테이너 */}
      
      {/* 배너 컴포넌트 */}
      {/* 주요 영화(Featured Movie) 정보를 표시하는 배너 */}
      <Banner movie={featuredMovie} />
  
      {/* 영화 슬라이더 컴포넌트 */}
      {/* 인기 영화 슬라이더 */}
      <MovieRow
        title="인기 영화"                // 섹션 제목: '인기 영화'
        fetchUrl={popularMoviesUrl}     // 인기 영화를 가져오는 API URL
        getImageUrl={getImageUrl}       // 영화 이미지 URL을 생성하는 함수
        toggleWishlist={toggleWishlist} // 위시리스트에 추가/제거하는 함수
        isInWishlist={isInWishlist}     // 영화가 위시리스트에 있는지 확인하는 함수
      />
  
      {/* 최신 영화 슬라이더 */}
      <MovieRow
        title="최신 영화"                // 섹션 제목: '최신 영화'
        fetchUrl={newReleasesUrl}       // 최신 영화를 가져오는 API URL
        getImageUrl={getImageUrl}       // 영화 이미지 URL을 생성하는 함수
        toggleWishlist={toggleWishlist} // 위시리스트에 추가/제거하는 함수
        isInWishlist={isInWishlist}     // 영화가 위시리스트에 있는지 확인하는 함수
      />
  
      {/* 액션 영화 슬라이더 */}
      <MovieRow
        title="액션 영화"                // 섹션 제목: '액션 영화'
        fetchUrl={actionMoviesUrl}      // 액션 영화를 가져오는 API URL
        getImageUrl={getImageUrl}       // 영화 이미지 URL을 생성하는 함수
        toggleWishlist={toggleWishlist} // 위시리스트에 추가/제거하는 함수
        isInWishlist={isInWishlist}     // 영화가 위시리스트에 있는지 확인하는 함수
      />
    </div>
  );
};

export default HomeMain;
