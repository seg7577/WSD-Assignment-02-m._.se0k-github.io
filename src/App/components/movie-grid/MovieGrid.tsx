import React, { useEffect, useState } from 'react';
import './MovieGrid.css';

const MovieGrid = ({
  fetchUrl,
  rowSize,
  getImageUrl,
}: {
  fetchUrl: string;
  rowSize: number;
  getImageUrl: (path: string) => string;
  toggleWishlist: (movie: any) => void;
  isInWishlist: (id: number) => boolean;
}) => {

  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 8; // 한 페이지에 표시할 영화 수

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(fetchUrl);
        const data = await response.json();
        setMovies(data.results || []); //영화 데이터 저장
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, [fetchUrl]);

  const totalPages = Math.ceil(movies.length / itemsPerPage); // 총 페이지 수
  const currentMovies = movies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ); // 현재 페이지에 표시할 영화 데이터
  
  return (
    <div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}>이전
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}>다음
        </button>
      </div>
      <div className="movie-grid">

      <div className="grid-container">
        {currentMovies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
          <div className="movie-title">{movie.title}</div>
        </div>))}
      </div>
    </div>
    </div>

  );
};

export default MovieGrid;
