// HomeSearch.tsx
import React, { useState } from 'react';
import MovieSearch from '../../movie-search/MovieSearch';
import MovieInfiniteScroll from '../../movie-infinite-scroll/MovieInfiniteScroll';
import './HomeSearch.css';

const HomeSearch = () => {
  const [options, setOptions] = useState({
    genreId: '',
    sortId: '',
    ageId: 0,
  });

  const dropdownEntries = [
    {
      key: 'genreId',
      options: ['액션', '드라마', '코미디'], // 실제 장르 옵션으로 대체
    },
    {
      key: 'sortId',
      options: ['최신순', '인기순', '평점순'], // 실제 정렬 옵션으로 대체
    },
    {
      key: 'ageId',
      options: ['0', '12', '15', '18'], // 숫자 값을 문자열로 저장
    },
  ];

  const changeOptions = (key: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [key]: key === 'ageId' ? parseInt(value, 10) : value, // ageId는 숫자로 변환
    }));
  };

  const clearOptions = () => {
    setOptions({ genreId: '', sortId: '', ageId: 0 }); // 초기 상태로 설정
  };

  const fetchUrl = `api/movies?genre=${options.genreId}&sort=${options.sortId}&vote=${options.ageId}`;

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
        <MovieInfiniteScroll
          fetchUrl={fetchUrl}
          getImageUrl={(path) => `https://image.tmdb.org/t/p/w500/${path}`} // 이미지 URL 생성
          toggleWishlist={(movie) => console.log('Wishlist toggled:', movie)}
          isInWishlist={(id) => false} // Wishlist 확인 로직
        />
      </div>
    </div>
  );
};

export default HomeSearch;
