import React, { useState, useEffect } from 'react';
import './MovieGrid.css';

const MovieGrid = ({
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
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.ceil(movies.length / rowSize);
  const visibleMovies = movies.slice(
    (currentPage - 1) * rowSize,
    currentPage * rowSize
  );

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
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
            이전
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
