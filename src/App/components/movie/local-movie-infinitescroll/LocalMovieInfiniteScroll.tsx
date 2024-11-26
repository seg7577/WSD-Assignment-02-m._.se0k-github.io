import React, { useEffect, useRef, useState } from 'react';
import './LocalMovieInfiniteScroll.css';

interface Movie {
  id: number;
  poster_path?: string; // poster_path가 없는 경우를 허용
  title: string;
}

interface LocalMovieInfiniteScrollProps {
  movies: Movie[];
  getImageUrl: (path: string | undefined) => string;
  toggleWishlist: (movie: Movie) => void;
  isInWishlist: (id: number) => boolean;
}

const LocalMovieInfiniteScroll = ({
  movies,
  getImageUrl,
  toggleWishlist,
  isInWishlist,
}: LocalMovieInfiniteScrollProps) => {
  const [visibleMovies, setVisibleMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const loadingTriggerRef = useRef<HTMLDivElement | null>(null);
  const rowSize = 5;

  // 페이지 초기화
  useEffect(() => {
    setVisibleMovies([]); // 초기화
    setPage(1); // 페이지 번호 초기화
  }, [movies]);

  // 페이지별로 영화 로드
  useEffect(() => {
    const startIndex = (page - 1) * rowSize;
    const endIndex = page * rowSize;
    const nextMovies = movies.slice(startIndex, endIndex);

    // 중복 확인 후 추가
    const uniqueMovies = nextMovies.filter(
      (movie) => !visibleMovies.some((visibleMovie) => visibleMovie.id === movie.id)
    );

    if (uniqueMovies.length > 0) {
      setVisibleMovies((prev) => [...prev, ...uniqueMovies]);
    }
    setIsLoading(false);
  }, [page, movies]);

  // 무한 스크롤을 위한 IntersectionObserver 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading && page * rowSize < movies.length) {
          setIsLoading(true);
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loadingTriggerRef.current) observer.observe(loadingTriggerRef.current);

    return () => {
      if (loadingTriggerRef.current) observer.unobserve(loadingTriggerRef.current);
    };
  }, [isLoading, movies, page]);

  const scrollToTop = () => {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="movie-grid">
      <div className="grid-container">
        {visibleMovies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => toggleWishlist(movie)}
          >
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title || 'No Title'}
            />
            <div className="movie-title">{movie.title || 'Untitled'}</div>
            {isInWishlist(movie.id) && <div className="wishlist-indicator">👍</div>}
          </div>
        ))}
      </div>
      <div ref={loadingTriggerRef} className="loading-trigger">
        {isLoading && <div className="loading-indicator">Loading...</div>}
      </div>
      <button className="top-button" onClick={scrollToTop}>
        Top
      </button>
    </div>
  );
};

export default LocalMovieInfiniteScroll;
