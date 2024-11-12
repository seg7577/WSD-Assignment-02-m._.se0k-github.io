import React from 'react';

import { useWishlist } from '../context/WishContext';
const MovieCard = ({ movie }: { movie: { id: number; title: string } }) => {
  const { state, dispatch } = useWishlist();
  
  // 위시리스트에 포함 여부 확인
  const isInWishlist = state.wishlist.some((item) => item.id === movie.id);

  // 위시리스트 토글 함수
  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', movieId: movie.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', movie });
    }
  };

  return (
    <div> 
        <h3>
            {movie.title}
        </h3>
        <button onClick={toggleWishlist}>
            {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </button>
    </div>
  );
};

export default MovieCard;
