import React, { useEffect, useRef, useState } from 'react';
import './MovieInfiniteScroll.css';

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

interface MovieInfiniteScrollPropsBase {
  getImageUrl: (path: string) => string; // 이미지 URL 생성 함수
  toggleWishlist: (movie: Movie) => void; // 위시리스트 추가/제거 함수
  isInWishlist: (id: number) => boolean; // 위시리스트 확인 함수
}

type MovieInfiniteScrollProps =
  | (MovieInfiniteScrollPropsBase & { movies: Movie[]; fetchUrl?: never }) // `movies`만 제공되는 경우
  | (MovieInfiniteScrollPropsBase & { fetchUrl: string; movies?: never }); // `fetchUrl`만 제공되는 경우


const MovieInfiniteScroll = ({
  fetchUrl,
  getImageUrl,
  toggleWishlist,
  isInWishlist,
}: MovieInfiniteScrollProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadingTriggerRef = useRef<HTMLDivElement | null>(null);

  // fetchUrl이 변경될 때 상태 초기화
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [fetchUrl]);

  // TMDB API에서 영화 데이터를 가져오는 함수
  const fetchMovies = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${fetchUrl}&page=${page}`);
      const data = await response.json();

      if (page === 1) {
        // 페이지 1이면 새 데이터로 교체
        setMovies(data.results || []);
      } else {
        // 추가 데이터를 기존 데이터와 병합
        setMovies((prev) => [...prev, ...(data.results || [])]);
      }

      setHasMore(page < data.total_pages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // fetchUrl이나 page가 변경될 때 데이터 요청
  useEffect(() => {
    fetchMovies();
  }, [fetchUrl, page]);

  // 무한 스크롤 로직
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loadingTriggerRef.current) observer.observe(loadingTriggerRef.current);

    return () => {
      if (loadingTriggerRef.current) observer.unobserve(loadingTriggerRef.current);
    };
  }, [hasMore, isLoading]);

  const scrollToTop = () => {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

export default MovieInfiniteScroll;

