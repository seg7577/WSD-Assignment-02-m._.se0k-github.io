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

  const [wishlist, setWishlist] = useState<number[]>(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  const toggleWishlist = (movie: { id: number }) => {
    setWishlist((prevWishlist) => {
      const isInList = prevWishlist.includes(movie.id);
      const updatedWishlist = isInList
        ? prevWishlist.filter((id) => id !== movie.id)
        : [...prevWishlist, movie.id];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  const isInWishlist = (id: number) => wishlist.includes(id);

  const BASE_URL = 'https://api.themoviedb.org/3';
  const [fetchUrl, setFetchUrl] = useState<string>(''); // 필터링된 API URL 상태 관리
  const [password, setPassword] = useState<string>(''); // TMDB API Key

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
      key: 'genreId',
      options: ['28:액션', '12:모험', '35:코미디'], // 장르 ID와 이름
    },
    {
      key: 'sortId',
      options: ['최신순', '인기순', '평점순'], // 정렬 옵션
    },
    {
      key: 'ageId',
      options: ['0', '12', '15', '18'], // 연령 제한 옵션
    },
  ];

  // 필터링 옵션 변경 함수
  const changeOptions = (key: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [key]: key === 'ageId' ? parseInt(value, 10) : value.split(':')[0], // ageId는 숫자로 변환, genreId는 ID만 추출
    }));
  };

  // 필터링 옵션 초기화 함수
  const clearOptions = () => {
    setOptions({ genreId: '', sortId: '', ageId: 0 });
  };

  // 필터링된 API URL 생성 함수
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
      password
    )}&page=${page}${genreParam}${sortParamQuery}${ageParam}`;
  };

  // 필터링 조건 변경 시 API URL 업데이트
  useEffect(() => {
    if (password) {
      setFetchUrl(fetchSearchMoviesUrl()); // URL 생성 및 상태 업데이트
    }
  }, [options, password]);

  return (
    <div className="container-search">
      {/* 검색 및 필터링 UI */}
      <div className="container-search-bar">
        <MovieSearch
          dropdownEntries={dropdownEntries}
          onOptionSelect={changeOptions}
          onClearOptions={clearOptions}
        />
      </div>
      {/* 필터링된 영화 목록 */}
      <div className="content-search">
        {fetchUrl && (
          <MovieInfiniteScroll
            fetchUrl={fetchUrl} // API URL 전달
            getImageUrl={(path) => `https://image.tmdb.org/t/p/w500/${path}`} // 포스터 이미지 생성 함수
            toggleWishlist={toggleWishlist} // Wishlist 토글 함수 전달
            isInWishlist={isInWishlist} // Wishlist 상태 확인 함수 전달
          />
        )}
      </div>
    </div>
  );
};

export default HomeSearch;
