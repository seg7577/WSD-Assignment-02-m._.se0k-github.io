import React, { useEffect, useRef, useState } from 'react'; // React와 필요한 훅(useEffect, useRef, useState)을 가져옵니다.
import './MovieInfiniteScroll.css'; // 컴포넌트 스타일링을 위한 CSS 파일 가져오기

const MovieInfiniteScroll = ({
  fetchUrl, // 데이터를 가져올 TMDB API URL
  getImageUrl, // 이미지 경로를 생성하는 함수
  toggleWishlist, // 영화 위시리스트를 토글하는 함수
  isInWishlist, // 특정 영화가 위시리스트에 있는지 확인하는 함수
}: {
  fetchUrl: string; // API URL의 타입 정의
  getImageUrl: (path: string) => string; // 이미지 경로 생성 함수의 타입 정의
  toggleWishlist: (movie: any) => void; // 위시리스트 토글 함수의 타입 정의
  isInWishlist: (id: number) => boolean; // 위시리스트 확인 함수의 타입 정의
}) => {
  const [movies, setMovies] = useState<any[]>([]); // API로 가져온 영화 데이터를 저장하는 상태
  const [page, setPage] = useState(1); // 현재 요청 중인 페이지 번호를 저장하는 상태
  const [isLoading, setIsLoading] = useState(false); // 데이터가 로드 중인지 여부를 관리하는 상태
  const [hasMore, setHasMore] = useState(true); // 추가 데이터를 불러올 수 있는지 여부를 관리하는 상태
  const loadingTriggerRef = useRef<HTMLDivElement | null>(null); // Intersection Observer 기준이 될 DOM 요소 참조

  // TMDB API에서 영화 데이터를 가져오는 함수
  const fetchMovies = async () => {
    if (isLoading || !hasMore) return; // 이미 로드 중이거나 데이터가 없으면 함수 종료

    setIsLoading(true); // 로딩 상태를 true로 설정
    try {
      const response = await fetch(`${fetchUrl}&page=${page}`); // API 호출에 현재 페이지 번호 추가
      const data = await response.json(); // 응답 데이터를 JSON 형식으로 변환

      // 기존 영화 데이터에 새로 가져온 데이터를 추가하여 상태 업데이트
      setMovies((prev) => [...prev, ...data.results]);

      // API의 total_pages를 확인하여 더 이상 데이터가 없으면 hasMore를 false로 설정
      setHasMore(page < data.total_pages);

      // 페이지 번호를 1 증가
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching movies:', error); // 에러 발생 시 콘솔에 출력
    } finally {
      setIsLoading(false); // 로딩 상태를 false로 설정
    }
  };

  // 페이지 로드 시 또는 페이지 상태가 변경될 때 데이터를 가져오는 효과
  useEffect(() => {
    fetchMovies(); // fetchMovies 함수 호출
  }, [page, fetchUrl]); // page나 fetchUrl이 변경될 때마다 실행

  // Intersection Observer를 설정하여 무한 스크롤 구현
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          // 로딩 중이 아니고 더 불러올 데이터가 있으면 페이지 번호 증가
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 } // 요소가 완전히 보였을 때 트리거
    );

    if (loadingTriggerRef.current) {
      observer.observe(loadingTriggerRef.current); // 로딩 트리거를 관찰
    }

    return () => {
      if (loadingTriggerRef.current) {
        observer.unobserve(loadingTriggerRef.current); // 컴포넌트 언마운트 시 관찰 해제
      }
    };
  }, [hasMore, isLoading]); // hasMore나 isLoading이 변경될 때마다 실행

  // Top 버튼 클릭 시 페이지 최상단으로 스크롤
  const scrollToTop = () => {
    const scrollElement =
      document.querySelector('.movie-grid') || document.documentElement; // 스크롤할 대상 설정
    scrollElement.scrollTo({ top: 0, behavior: 'smooth' }); // 부드럽게 최상단으로 스크롤
  };

  return (
    <div className="movie-grid">
      {/* 영화 카드 배열을 감싸는 컨테이너 */}
      <div className="grid-container">
        {movies.map((movie) => (
          <div
            key={movie.id} // React가 각 영화 카드를 고유하게 식별하기 위한 key 값
            className="movie-card" // 영화 카드 스타일을 위한 클래스
            onClick={() => toggleWishlist(movie)} // 클릭 시 위시리스트 토글 함수 호출
          >
            <img
              src={getImageUrl(movie.poster_path)} // 영화 포스터 이미지 URL 생성
              alt={movie.title} // 이미지 대체 텍스트로 영화 제목 설정
            />
            <div className="movie-title">{movie.title}</div> {/* 영화 제목 표시 */}
            {isInWishlist(movie.id) && (
              <div className="wishlist-indicator">👍</div> // 위시리스트에 있는 경우 표시
            )}
          </div>
        ))}
      </div>
      {/* 무한 스크롤 로딩 트리거 */}
      <div ref={loadingTriggerRef} className="loading-trigger">
        {isLoading && <div className="loading-indicator">Loading...</div>} {/* 로딩 중 표시 */}
      </div>
      {/* 최상단으로 이동하는 Top 버튼 */}
      <button className="top-button" onClick={scrollToTop}>
        Top {/* 버튼 텍스트 */}
      </button>
    </div>
  );
};

export default MovieInfiniteScroll; // 컴포넌트를 외부에서 사용할 수 있도록 내보냄
