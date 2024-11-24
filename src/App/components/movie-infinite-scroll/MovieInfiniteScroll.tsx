import React, { useEffect, useRef, useState } from 'react';
import './MovieInfiniteScroll.css';

const MovieInfiniteScroll = ({
  fetchUrl, // TMDB API URL
  getImageUrl, // 이미지 경로 생성 함수
  toggleWishlist, // 위시리스트 토글 함수
  isInWishlist, // 위시리스트 확인 함수
  
}: {
  fetchUrl: string;
  getImageUrl: (path: string) => string;
  toggleWishlist: (movie: any) => void;
  isInWishlist: (id: number) => boolean;
}) => {
  const [movies, setMovies] = useState<any[]>([]); // 전체 영화 데이터 저장
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부
  const loadingTriggerRef = useRef<HTMLDivElement | null>(null); // Intersection Observer 기준

  // TMDB API에서 영화 데이터를 가져오는 함수
  const fetchMovies = async () => {
    if (isLoading || !hasMore) return; // 로딩 중이거나 데이터가 없으면 요청 중단

    setIsLoading(true);
    try {
      const response = await fetch(`${fetchUrl}&page=${page}`); // API 요청에 페이지 번호 추가
      const data = await response.json();

      // 기존 영화 데이터에 새로운 영화 데이터를 추가
      setMovies((prev) => [...prev, ...data.results]);

      // total_pages를 확인하여 더 이상 가져올 데이터가 없으면 종료
      setHasMore(page < data.total_pages);

      // 페이지 번호 증가
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false); // 로딩 상태 해제
    }
  };

  // 페이지 로드 시 또는 page 상태가 변경될 때 데이터 로드
  useEffect(() => {
    fetchMovies();
  }, [page, fetchUrl]);

  // Intersection Observer 설정.. 수정본...
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
        }
      },
      { threshold: 1.0 }
    );

    if (loadingTriggerRef.current) {
      observer.observe(loadingTriggerRef.current); // 로딩 트리거 관찰 시작
    }

    return () => {
      if (loadingTriggerRef.current) {
        observer.unobserve(loadingTriggerRef.current); // 옵저버 해제
      }
    };
  }, [hasMore, isLoading]);

  return (
    <div className="movie-grid">
      <div className="grid-container">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => toggleWishlist(movie)}
          >
            <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
            <div className="movie-title">{movie.title}</div>
            {isInWishlist(movie.id) && (
              <div className="wishlist-indicator">👍</div>
            )}
          </div>
        ))}
      </div>
      <div ref={loadingTriggerRef} className="loading-trigger">
        {isLoading && <div className="loading-indicator">Loading...</div>}
      </div>
    </div>
  );
};

export default MovieInfiniteScroll;
