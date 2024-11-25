import React from 'react';
import { useWishlist } from '../context/WishContext';

interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
}

const MovieCard = ({ movie }: { movie: Movie }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();

  // 위시리스트에 포함 여부 확인
  const inWishlist = isInWishlist(movie.id);

  // 버튼 클릭 시 위시리스트 토글
  const handleWishlistToggle = () => {
    toggleWishlist(movie);
  };

  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>
      <button onClick={handleWishlistToggle}>
        {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </button>
    </div>
  );
};

export default MovieCard;

