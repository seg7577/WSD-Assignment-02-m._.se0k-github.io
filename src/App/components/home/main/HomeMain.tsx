import React, { useState } from 'react';
import Banner from '../../banner/Banner';
import MovieRow from '../../movie-row/MovieRow';
import './HomeMain.css'; // 스타일 가져오기
import { useAuth } from '../../../context/AuthContext';

const HomeMain = () => {
  const { user } = useAuth(); // 현재 로그인된 사용자 정보 가져오기
  // 위시리스트 상태 저장
  const [wishlist, setWishlist] = useState<number[]>(() => {
    // 로컬 스토리지에서 초기 상태를 가져옴
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  if (!user || !user.password) {
    console.error('User is not authenticated or API key is missing.');
    return <div>Error: API key is missing.</div>;
  }

  // 동적으로 URL을 생성하는 함수
  const createApiUrl = (endpoint: string, params: Record<string, any> = {}) => {
    const baseUrl = 'https://api.themoviedb.org/3';
    const queryParams = new URLSearchParams({
      api_key: user.password, // 사용자 API 키를 동적으로 추가
      language: 'ko-KR',
      ...params, // 추가 파라미터 병합
    });

    return `${baseUrl}/${endpoint}?${queryParams.toString()}`;
  };

  const popularMoviesUrl = createApiUrl('movie/popular');
  const newReleasesUrl = createApiUrl('movie/now_playing');
  const actionMoviesUrl = createApiUrl('discover/movie', { with_genres: '28' });

  // 이미지 URL 생성 함수
  const getImageUrl = (path: string) =>
    `https://image.tmdb.org/t/p/original${path}`;


  // 위시리스트 토글 함수
  const toggleWishlist = (movie: { id: number }) => {
    setWishlist((prevWishlist) => {
      const isInList = prevWishlist.includes(movie.id);
      const updatedWishlist = isInList
        ? prevWishlist.filter((id) => id !== movie.id) // 이미 있다면 제거
        : [...prevWishlist, movie.id]; // 없다면 추가
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // 로컬 스토리지에 저장
      return updatedWishlist;
    });
  };

  // 위시리스트 상태 확인 함수
  const isInWishlist = (id: number) => wishlist.includes(id);

  return (
    <div className="home-main">
      {/* 홈 메인 컴포넌트를 감싸는 컨테이너 */}
      
      {/* 배너 컴포넌트 */}
      <Banner />

      {/* 영화 슬라이더 컴포넌트 */}
      {/* 인기 영화 슬라이더 */}
      <MovieRow
        title="인기 영화" // 섹션 제목: '인기 영화'
        fetchUrl={popularMoviesUrl} // 인기 영화를 가져오는 API URL
        getImageUrl={getImageUrl} // 영화 이미지 URL을 생성하는 함수
        toggleWishlist={toggleWishlist} // 위시리스트에 추가/제거하는 함수
        isInWishlist={isInWishlist} // 영화가 위시리스트에 있는지 확인하는 함수
      />

      {/* 최신 영화 슬라이더 */}
      <MovieRow
        title="최신 영화" // 섹션 제목: '최신 영화'
        fetchUrl={newReleasesUrl} // 최신 영화를 가져오는 API URL
        getImageUrl={getImageUrl} // 영화 이미지 URL을 생성하는 함수
        toggleWishlist={toggleWishlist} // 위시리스트에 추가/제거하는 함수
        isInWishlist={isInWishlist} // 영화가 위시리스트에 있는지 확인하는 함수
      />

      {/* 액션 영화 슬라이더 */}
      <MovieRow
        title="액션 영화" // 섹션 제목: '액션 영화'
        fetchUrl={actionMoviesUrl} // 액션 영화를 가져오는 API URL
        getImageUrl={getImageUrl} // 영화 이미지 URL을 생성하는 함수
        toggleWishlist={toggleWishlist} // 위시리스트에 추가/제거하는 함수
        isInWishlist={isInWishlist} // 영화가 위시리스트에 있는지 확인하는 함수
      />
    </div>
  );
};

export default HomeMain;
