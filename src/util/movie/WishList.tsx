import React, { createContext, useContext, useState, useEffect } from 'react';

// Movie 타입 정의 (프로젝트에 맞게 수정)
export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
}

// WishlistContext에서 사용할 타입
interface WishlistContextType {
  wishlist: Movie[];
  toggleWishlist: (movie: Movie) => void;
  isInWishlist: (movieId: number) => boolean;
}

// Context 생성
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// WishlistProvider 컴포넌트
export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Movie[]>([]);

  // 초기 로드: 로컬스토리지에서 위시리스트 가져오기
  useEffect(() => {
    const storedWishlist = localStorage.getItem('movieWishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // 위시리스트 변경 시 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem('movieWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // 위시리스트에 영화 추가/제거
  const toggleWishlist = (movie: Movie) => {
    setWishlist((prevWishlist) => {
      const isMovieInWishlist = prevWishlist.some((item) => item.id === movie.id);

      if (isMovieInWishlist) {
        return prevWishlist.filter((item) => item.id !== movie.id); // 이미 있다면 제거
      } else {
        return [...prevWishlist, movie]; // 없으면 추가
      }
    });
  };

  // 영화가 위시리스트에 있는지 확인
  const isInWishlist = (movieId: number) => {
    return wishlist.some((item) => item.id === movieId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook: useWishlist
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
