import React, { useState, useEffect } from 'react';
import MovieSearch from '../../\bmovie/movie-search/MovieSearch';
import MovieInfiniteScroll from '../../\bmovie/movie-infinite-scroll/MovieInfiniteScroll';
import './HomeSearch.css';

// 영화 데이터 타입 정의
interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

const HomeSearch = () => {
  const BASE_URL = 'https://api.themoviedb.org/3'; // TMDb API의 기본 URL

  // 검색 필터 상태 관리
  const [options, setOptions] = useState({
    genreId: '', // 장르 ID
    sortId: '', // 정렬 옵션
    ageId: 0, // 연령 제한
  });

  // 위시리스트 상태 관리
  const [wishlist, setWishlist] = useState<Movie[]>(() => {
    // 로컬 스토리지에서 초기 위시리스트를 로드
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  // API 호출 URL 상태 관리
  const [fetchUrl, setFetchUrl] = useState<string>('');
  const [password, setPassword] = useState<string>(''); // API 키 상태 관리

  // 초기 로드 시 로컬 스토리지에서 API 키를 로드
  useEffect(() => {
    const storedPassword = localStorage.getItem('TMDb-Key');
    if (storedPassword) {
      setPassword(storedPassword);
    }
  }, []);

  // 기본 API URL 생성 함수
  const getDefaultUrl = () =>
    `${BASE_URL}/discover/movie?api_key=${encodeURIComponent(password)}&page=1`;

  // API 키 변경 시 기본 URL로 설정
  useEffect(() => {
    if (password) {
      setFetchUrl(getDefaultUrl());
    }
  }, [password]);

  // 검색 필터 변경 시 API 호출 URL 업데이트
  useEffect(() => {
    if (password) {
      const genreParam = options.genreId ? `&with_genres=${options.genreId}` : ''; // 장르 필터
      const sortParam = options.sortId ? `&sort_by=${options.sortId}` : ''; // 정렬 필터
      const ageParam = options.ageId ? `&certification_country=US&certification.lte=${options.ageId}` : ''; // 연령 필터
      const updatedUrl = `${BASE_URL}/discover/movie?api_key=${encodeURIComponent(
        password
      )}&page=1${genreParam}${sortParam}${ageParam}`; // 필터를 적용한 URL 생성
      setFetchUrl(updatedUrl);
    }
  }, [options, password]);

  // 검색 필터 드롭다운 옵션
  const dropdownEntries = [
    {
      key: 'genreId',
      options: [
        { id: '28', name: '액션' }, // 액션 장르
        { id: '12', name: '모험' }, // 모험 장르
        { id: '35', name: '코미디' }, // 코미디 장르
      ],
    },
    {
      key: 'sortId',
      options: [
        { id: 'release_date.desc', name: '최신순' }, // 최신순 정렬
        { id: 'popularity.desc', name: '인기순' }, // 인기순 정렬
        { id: 'vote_average.desc', name: '평점순' }, // 평점순 정렬
      ],
    },
    { key: 'ageId', options: ['0', '12', '15', '18'] }, // 연령 필터 옵션
  ];

  // 필터 변경 시 상태 업데이트
  const changeOptions = (key: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [key]: key === 'ageId' ? parseInt(value, 10) : value, // 연령 옵션은 숫자로 변환
    }));
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' }); // 스크롤 초기화
  };

  // 필터 초기화
  const clearOptions = () => {
    setOptions({ genreId: '', sortId: '', ageId: 0 }); // 필터 상태 초기화
    setFetchUrl(getDefaultUrl()); // 기본 API URL로 리셋
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' }); // 스크롤 초기화
  };

  // 위시리스트 추가/제거 함수
  const toggleWishlist = (movie: Movie) => {
    setWishlist((prevWishlist) => {
      const isInList = prevWishlist.some((item) => item.id === movie.id);
      const updatedWishlist = isInList
        ? prevWishlist.filter((item) => item.id !== movie.id) // 이미 있다면 제거
        : [...prevWishlist, movie]; // 없다면 추가
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // 로컬 스토리지에 저장
      return updatedWishlist; // 상태 업데이트
    });
  };

  // 위시리스트에 영화가 있는지 확인
  const isInWishlist = (id: number) => wishlist.some((movie) => movie.id === id);

  return (
    <div className="container-search">
      {/* 검색 필터 컴포넌트 */}
      <div className="container-search-bar">
        <MovieSearch
          dropdownEntries={dropdownEntries} // 드롭다운 필터 옵션
          selectedOptions={options} // 현재 선택된 필터 옵션
          onOptionSelect={changeOptions} // 필터 변경 핸들러
          onClearOptions={clearOptions} // 필터 초기화 핸들러
        />
      </div>
      {/* 검색 결과 무한 스크롤 컴포넌트 */}
      <div className="content-search">
        {fetchUrl && (
          <MovieInfiniteScroll
            fetchUrl={fetchUrl} // 검색 결과를 가져올 API URL
            getImageUrl={(path) => `https://image.tmdb.org/t/p/w500${path}`} // 포스터 이미지 URL 생성
            toggleWishlist={toggleWishlist} // 위시리스트 추가/제거 핸들러
            isInWishlist={isInWishlist} // 위시리스트 확인 핸들러
          />
        )}
      </div>
    </div>
  );
};

export default HomeSearch;
