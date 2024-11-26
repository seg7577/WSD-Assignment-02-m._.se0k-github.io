
import React, { useEffect, useState } from 'react';
import LocalMovieInfiniteScroll from '../local-movie-infinitescroll/LocalMovieInfiniteScroll';
import './MovieWishlist.css';

interface Movie {
  id: number;
  poster_path?: string;
  title: string;
}

const MovieWishlist = () => {
  const [wishlistMovies, setWishlistMovies] = useState<Movie[]>([]);

  // 로컬 스토리지에서 위시리스트 로드
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlistMovies(JSON.parse(storedWishlist));
    }
  }, []);

  // 로컬 스토리지 업데이트 함수
  const updateWishlistInLocalStorage = (updatedWishlist: Movie[]) => {
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  // 위시리스트 추가/제거 함수
  const toggleWishlist = (movie: Movie) => {
    const isMovieInWishlist = wishlistMovies.some((item) => item.id === movie.id);
    const updatedWishlist = isMovieInWishlist
      ? wishlistMovies.filter((item) => item.id !== movie.id) // 이미 있다면 제거
      : [...wishlistMovies, movie]; // 없다면 추가

    setWishlistMovies(updatedWishlist); // 상태 업데이트
    updateWishlistInLocalStorage(updatedWishlist); // 로컬 스토리지 동기화
  };

  // 위시리스트 상태 확인 함수
  const isInWishlist = (id: number) =>
    wishlistMovies.some((movie) => movie.id === id);

  // 이미지 URL 생성 함수
  const getImageUrl = (path: string | undefined) =>
    path ? `https://image.tmdb.org/t/p/w500${path}` : '/path/to/placeholder-image.png';

  return (
    <div className="wishlist-page">
      <h2>My Wishlist</h2>
      {wishlistMovies.length > 0 ? (
        <LocalMovieInfiniteScroll
          movies={wishlistMovies}
          getImageUrl={getImageUrl}
          toggleWishlist={toggleWishlist}
          isInWishlist={isInWishlist}
        />
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default MovieWishlist;
