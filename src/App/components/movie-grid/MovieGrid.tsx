import React, { useEffect, useState } from 'react';
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

  return (
    <div className="movie-grid">
      <div className="grid-container">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
            <div className="movie-title">{movie.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
