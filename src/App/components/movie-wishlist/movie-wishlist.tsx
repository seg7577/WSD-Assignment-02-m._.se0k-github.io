import React, { useState } from 'react';
import './movie-wishlist.css';

const MovieWishlist = () => {
  const [currentView, setCurrentView] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlistMovies, setWishlistMovies] = useState<any[]>([]); // 실제 데이터로 대체
  const rowSize = 5; // 한 줄에 표시할 영화 수
  const totalPages = Math.ceil(wishlistMovies.length / rowSize);

  const toggleWishlist = (movie: any) => {
    const updatedMovies = wishlistMovies.filter((item) => item.id !== movie.id);
    setWishlistMovies(updatedMovies);
  };

  const getImageUrl = (path: string) => `https://image.tmdb.org/t/p/w500${path}`;

  const visibleWishlistMovies = wishlistMovies.slice(
    (currentPage - 1) * rowSize,
    currentPage * rowSize
  );

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="movie-grid">
      <div className={`grid-container ${currentView}`}>
        {visibleWishlistMovies.map((movieGroup, i) => (
          <div
            key={i}
            className={`movie-row ${movieGroup.length === rowSize ? 'full' : ''}`}
          >
            {movieGroup.map((movie: any) => (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => toggleWishlist(movie)}
              >
                <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
                <div className="movie-title">{movie.title}</div>
                <div className="wishlist-indicator">👍</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {wishlistMovies.length === 0 && (
        <div className="empty-wishlist">위시리스트가 비어 있습니다.</div>
      )}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            &lt; 이전
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            다음 &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieWishlist;
