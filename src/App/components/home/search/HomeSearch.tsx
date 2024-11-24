import React, { useState, useEffect } from 'react';
import MovieSearch from '../../movie-search/MovieSearch'; // 검색 필터링 컴포넌트
import MovieInfiniteScroll from '../../movie-infinite-scroll/MovieInfiniteScroll'; // 무한 스크롤 컴포넌트
import './HomeSearch.css'; // 스타일링 파일

const HomeSearch = () => {
  const [options, setOptions] = useState({
    genreId: '', // 선택된 장르 ID
    sortId: '', // 선택된 정렬 ID
    ageId: 0, // 선택된 연령 제한 (0: 전체 관람가)
  });
  const [fetchUrl, setFetchUrl] = useState<string>(''); // API URL 상태 관리
  const [password, setPassword] = useState<string>(''); // TMDB API Key
  const BASE_URL = 'https://api.themoviedb.org/3'; // TMDB 기본 URL

  // 로컬 스토리지에서 API Key 가져오기
  useEffect(() => {
    const storedPassword = localStorage.getItem('TMDb-Key');
    if (storedPassword) {
      setPassword(storedPassword);
    }
  }, []);

  // 드롭다운 필터링에 사용할 옵션 목록
  const dropdownEntries = [
    {
      key: 'genreId', // 장르 필터링 키
      options: ['Action', 'Adventure', 'Comedy'], // 장르 옵션 (실제 ID로 대체 가능)
    },
    {
      key: 'sortId', // 정렬 필터링 키
      options: ['최신순', '인기순', '평점순'], // 정렬 옵션
    },
    {
      key: 'ageId', // 연령 제한 필터링 키
      options: ['0', '12', '15', '18'], // 연령 제한 옵션
    },
  ];

  // 필터링 옵션 변경 함수
  const changeOptions = (key: string, value: string) => {
    setOptions((prev) => ({
      ...prev, // 기존 상태 유지
      [key]: key === 'ageId' ? parseInt(value, 10) : value, // ageId는 숫자로 변환
    }));
  };

  // 필터링 옵션 초기화 함수
  const clearOptions = () => {
    setOptions({ genreId: '', sortId: '', ageId: 0 }); // 초기 상태로 리셋
  };

  // 필터링된 데이터를 가져올 API URL 생성
  const fetchSearchMoviesUrl = (page: number = 1) => {
    const genreParam = options.genreId ? `&with_genres=${options.genreId}` : '';
    const sortParam =
      options.sortId === '최신순'
        ? 'release_date.desc'
        : options.sortId === '인기순'
        ? 'popularity.desc'
        : options.sortId === '평점순'
        ? 'vote_average.desc'
        : '';
    const sortParamQuery = sortParam ? `&sort_by=${sortParam}` : '';
    const ageParam = options.ageId ? `&certification_country=US&certification.lte=${options.ageId}` : '';
  
    return `${BASE_URL}/discover/movie?api_key=${encodeURIComponent(
      localStorage.getItem('TMDb-Key') || ''
    )}&page=${page}${genreParam}${sortParamQuery}${ageParam}`;
  };

  useEffect(() => {
    setFetchUrl(fetchSearchMoviesUrl()); // 필터 변경 시 URL 생성
  }, [options]);

  return (
    <div className="container-search">
      {/* 검색 및 필터링 UI */}
      <div className="container-search-bar">
        <MovieSearch
          dropdownEntries={dropdownEntries} // 드롭다운 필터링 옵션 전달
          onOptionSelect={changeOptions} // 옵션 선택 시 호출할 함수 전달
          onClearOptions={clearOptions} // 초기화 버튼 클릭 시 호출할 함수 전달
        />
      </div>
      {/* 필터링된 영화 목록 */}
      <div className="content-search">
        <MovieInfiniteScroll
          fetchUrl={fetchSearchMoviesUrl()} // API 요청 URL 전달
          getImageUrl={(path) => `https://image.tmdb.org/t/p/w500/${path}`} // 포스터 이미지 URL 생성 함수
          toggleWishlist={(movie) => console.log('Wishlist toggled:', movie)} // Wishlist 토글 함수
          isInWishlist={(id) => false} // Wishlist 포함 여부 확인 함수
        />
      </div>
    </div>
  );
};

export default HomeSearch;
