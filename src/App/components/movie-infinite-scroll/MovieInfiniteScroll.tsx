import React, { useEffect, useRef, useState } from 'react';
import './MovieInfiniteScroll.css';

const MovieInfiniteScroll = ({
  fetchUrl,
  rowSize,
  getImageUrl,
  toggleWishlist,
  isInWishlist,
}: {
  fetchUrl: string;
  rowSize: number;
  getImageUrl: (path: string) => string;
  toggleWishlist: (movie: any) => void;
  isInWishlist: (id: number) => boolean;
}) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [visibleMovies, setVisibleMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const loadingTriggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(fetchUrl);
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, [fetchUrl]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleMovies((prev) =>
              movies.slice(0, prev.length + rowSize)
            );
            setIsLoading(false);
          }, 1000);
        }
      },
      { threshold: 1.0 }
    );

    if (loadingTriggerRef.current) {
      observer.observe(loadingTriggerRef.current);
    }

    return () => {
      if (loadingTriggerRef.current) {
        observer.unobserve(loadingTriggerRef.current);
      }
    };
  }, [movies, rowSize, isLoading]);

  return (
    <div className="movie-grid">
      <div className="grid-container">
        {visibleMovies.map((movie) => (
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
