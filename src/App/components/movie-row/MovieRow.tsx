import React, { useRef, useState, useEffect } from 'react';
import './MovieRow.css';

interface Movie {
  id: number; // 영화의 고유 ID
  poster_path: string; // 영화 포스터의 경로
  title: string; // 영화 제목
}

interface MovieRowProps {
  title: string; // 섹션 제목
  fetchUrl: string; // 영화 데이터를 가져올 API URL
  getImageUrl: (path: string) => string; // 포스터 경로를 전체 URL로 변환하는 함수
  toggleWishlist: (movie: Movie) => void; // 위시리스트에 추가/제거 함수
  isInWishlist: (id: number) => boolean; // 특정 영화가 위시리스트에 있는지 확인하는 함수
}

const MovieRow = ({
  title, // 섹션 제목
  fetchUrl, // 영화 데이터를 가져올 API URL
  getImageUrl, // 이미지 URL 변환 함수
  toggleWishlist, // 위시리스트 추가/제거 함수
  isInWishlist, // 위시리스트 확인 함수
}: MovieRowProps) => {
  const sliderRef = useRef<HTMLDivElement>(null); // 슬라이더 DOM 요소에 접근하기 위한 ref
  const [movies, setMovies] = useState<Movie[]>([]); // API에서 가져온 영화 데이터를 저장하는 상태
  const [scrollAmount, setScrollAmount] = useState(0); // 슬라이더의 현재 스크롤 위치를 추적하는 상태

  // 컴포넌트가 처음 렌더링되거나 fetchUrl이 변경될 때 API 데이터를 가져옴
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(fetchUrl); // fetchUrl로 API 요청
        const data = await response.json(); // 응답을 JSON 형식으로 변환
        setMovies(data.results || []); // 응답의 results를 movies 상태에 저장
      } catch (error) {
        console.error('Error fetching movies:', error); // 에러가 발생하면 콘솔에 로그 출력
      }
    };
    fetchMovies(); // API 호출 함수 실행
  }, [fetchUrl]); // fetchUrl이 변경될 때마다 재실행

  // 슬라이더를 좌우로 이동시키는 함수
  const slide = (direction: 'left' | 'right') => {
    const scrollValue = direction === 'left' ? 300 : -300; // 왼쪽은 -300px, 오른쪽은 +300px 이동
    setScrollAmount((prev) => prev + scrollValue); // 새로운 스크롤 값을 상태로 저장
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(${scrollAmount + scrollValue}px)`; // 슬라이더를 이동
    }
  };

  return (
    <div className="movie-row">
      {/* 섹션 제목 표시 */}
      <div className="title-container">
        <h2>{title}</h2>
      </div>
      <div className="slider-container">
        {/* 왼쪽 이동 버튼 */}
        <button className="slider-button-left" 
        onClick={() => slide('left')}>&lt; {/* 왼쪽 화살표 */}
        </button>
        {/* 슬라이더 창 */}
        <div className="slider-window">
          <div className="movie-slider" ref={sliderRef}>
            {movies.map((movie) => (
              <div
                key={movie.id} // 각 영화의 고유 ID를 키로 설정
                className="movie-card" // 영화 카드 스타일 클래스
                onClick={() => toggleWishlist(movie)} // 클릭 시 위시리스트 추가/제거
              >
                {/* 영화 포스터 이미지 */}
                <img
                  src={getImageUrl(movie.poster_path)} // 포스터 경로를 전체 URL로 변환
                  alt={movie.title} // 영화 제목을 alt 텍스트로 설정
                />
                {/* 영화가 위시리스트에 있으면 표시 */}
                {isInWishlist(movie.id) && (
                  <div className="wishlist-indicator">👍</div> // 위시리스트 표시 아이콘
                )}
              </div>
            ))}
          </div>
        </div>
        {/* 오른쪽 이동 버튼 */}
        <button
          className="slider-button-right"
          onClick={() => slide('right')} // 클릭 시 슬라이더를 오른쪽으로 이동
        >
          &gt; {/* 오른쪽 화살표 */}
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
