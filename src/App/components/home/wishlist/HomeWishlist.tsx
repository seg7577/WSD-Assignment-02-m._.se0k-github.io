import MovieWishlist from '../../\bmovie/movie-wishlist/MovieWishlist';
import React, { useEffect, useState } from 'react';
import './HomeWishlist.css'; // Wishlist 스타일 추가
import { useAuth } from '../../../context/AuthContext';

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<Movie[]>([]); // 위시리스트 영화 데이터 상태
  const { user } = useAuth(); // 현재 사용자 정보 가져오기

  // Local Storage에서 위시리스트 데이터를 불러오는 함수
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // 위시리스트에서 영화를 제거하는 함수
  const removeFromWishlist = (movieId: number) => {
    const updatedWishlist = wishlist.filter((movie) => movie.id !== movieId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">내가 찜한 리스트</h1>
      {wishlist.length === 0 ? (
        <p className="wishlist-empty">위시리스트가 비어 있습니다. 영화를 찜해보세요!</p>
      ) : (
        <div className="movie-grid">
          {wishlist.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <button
                  className="remove-button"
                  onClick={() => removeFromWishlist(movie.id)}
                >
                  찜 해제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
