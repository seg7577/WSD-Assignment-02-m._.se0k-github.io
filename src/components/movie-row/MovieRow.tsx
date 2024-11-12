import React, { useRef, useState, useEffect } from 'react';
import './MovieRow.css';

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

interface MovieRowProps {
  title: string;
  fetchUrl: string; // API URL을 받음
  getImageUrl: (path: string) => string;
  toggleWishlist: (movie: Movie) => void;
  isInWishlist: (id: number) => boolean;
}

const MovieRow = ({
  title,
  fetchUrl,
  getImageUrl,
  toggleWishlist,
  isInWishlist,
}: MovieRowProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [scrollAmount, setScrollAmount] = useState(0);

  // Fetch movies from API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(fetchUrl);
        const data = await response.json();
        setMovies(data.results || []); // API 응답이 배열인지 확인
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, [fetchUrl]);

  // 슬라이더 동작
  const slide = (direction: 'left' | 'right') => {
    const scrollValue = direction === 'left' ? -300 : 300;
    setScrollAmount((prev) => prev + scrollValue);
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(${scrollAmount + scrollValue}px)`;
    }
  };

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="slider-container">
        <button
          className="slider-button left"
          onClick={() => slide('left')}
        >
          &lt;
        </button>
        <div className="slider-window">
          <div className="movie-slider" ref={sliderRef}>
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => toggleWishlist(movie)}
              >
                <img
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                />
                {isInWishlist(movie.id) && (
                  <div className="wishlist-indicator">👍</div>
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          className="slider-button right"
          onClick={() => slide('right')}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
