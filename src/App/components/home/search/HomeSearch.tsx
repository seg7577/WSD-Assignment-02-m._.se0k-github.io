import React, { useState, useEffect } from 'react';
import MovieSearch from '../../movie-search/MovieSearch'; // 검색 필터링 컴포넌트
import MovieInfiniteScroll from '../../movie-infinite-scroll/MovieInfiniteScroll'; // 무한 스크롤 컴포넌트
import './HomeSearch.css'; // 스타일링 파일

const HomeSearch = () => {
  const BASE_URL = 'https://api.themoviedb.org/3';

  const [options, setOptions] = useState({
    genreId: '', // 선택된 장르 ID
    sortId: '', // 선택된 정렬 ID
    ageId: 0, // 선택된 연령 제한 (0: 전체 관람가)
  });

  const [wishlist, setWishlist] = useState<number[]>(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  const [fetchUrl, setFetchUrl] = useState<string>(''); // API URL 상태
  const [password, setPassword] = useState<string>(''); // TMDB API Key

  // 로컬 스토리지에서 API Key 가져오기
  useEffect(() => {
    const storedPassword = localStorage.getItem('TMDb-Key');
    if (storedPassword) {
      setPassword(storedPassword);
    }
  }, []);

  // 페이지 최초 렌더링 시 기본 API 호출
  useEffect(() => {
    if (password) {
      const defaultUrl = `${BASE_URL}/discover/movie?api_key=${encodeURIComponent(password)}&page=1`;
      setFetchUrl(defaultUrl);
    }
  }, [password]);

  // 드롭다운 옵션 변경 시 API 호출 URL 업데이트
  useEffect(() => {
    if (password) {
      const genreParam = options.genreId ? `&with_genres=${options.genreId}` : '';
      const sortParam = options.sortId ? `&sort_by=${options.sortId}` : '';
      const ageParam = options.ageId ? `&certification_country=US&certification.lte=${options.ageId}` : '';
      const updatedUrl = `${BASE_URL}/discover/movie?api_key=${encodeURIComponent(
        password
      )}&page=1${genreParam}${sortParam}${ageParam}`;
      setFetchUrl(updatedUrl);
    }
  }, [options, password]);

  const dropdownEntries = [
    {
      key: 'genreId',
      options: [
        { id: '28', name: '액션' },
        { id: '12', name: '모험' },
        { id: '35', name: '코미디' },
      ],
    },
    {
      key: 'sortId',
      options: [
        { id: 'release_date.desc', name: '최신순' },
        { id: 'popularity.desc', name: '인기순' },
        { id: 'vote_average.desc', name: '평점순' },
      ],
    },
    { key: 'ageId', options: ['0', '12', '15', '18'] },
  ];

  const changeOptions = (key: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [key]: key === 'ageId' ? parseInt(value, 10) : value,
    }));
  };

  const clearOptions = () => {
    setOptions({ genreId: '', sortId: '', ageId: 0 });
  };

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
