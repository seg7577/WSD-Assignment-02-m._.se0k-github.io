import React, { useState, useEffect } from 'react';
import MovieSearch from '../../movie-search/MovieSearch';
import MovieInfiniteScroll from '../../movie-infinite-scroll/MovieInfiniteScroll';
import './HomeSearch.css';

const HomeSearch = () => {
  const BASE_URL = 'https://api.themoviedb.org/3';

  const [options, setOptions] = useState({
    genreId: '',
    sortId: '',
    ageId: 0,
  });

  const [wishlist, setWishlist] = useState<number[]>(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  const [fetchUrl, setFetchUrl] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // 로컬 스토리지에서 API Key 가져오기
  useEffect(() => {
    const storedPassword = localStorage.getItem('TMDb-Key');
    if (storedPassword) {
      setPassword(storedPassword);
    }
  }, []);

  // API 기본 URL 생성
  const getDefaultUrl = () =>
    `${BASE_URL}/discover/movie?api_key=${encodeURIComponent(password)}&page=1`;

  // 페이지 최초 렌더링 시 기본 영화 리스트 로드
  useEffect(() => {
    if (password) {
      setFetchUrl(getDefaultUrl());
    }
  }, [password]);

  // 옵션 변경 시 API URL 업데이트
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
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' }); // 드롭다운 변경 시 맨 위로 스크롤
  };

  const clearOptions = () => {
    setOptions({ genreId: '', sortId: '', ageId: 0 });
    setFetchUrl(getDefaultUrl()); // 기본 API URL로 재설정
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' }); // 초기화 시 맨 위로 스크롤
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
      <div className="container-search-bar">
        <MovieSearch
          dropdownEntries={dropdownEntries}
          onOptionSelect={changeOptions}
          onClearOptions={clearOptions}
        />
      </div>
      <div className="content-search">
        {fetchUrl && (
          <MovieInfiniteScroll
            fetchUrl={fetchUrl}
            getImageUrl={(path) => `https://image.tmdb.org/t/p/w500/${path}`}
            toggleWishlist={toggleWishlist}
            isInWishlist={isInWishlist}
          />
        )}
      </div>
    </div>
  );
};

export default HomeSearch;
