import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';

// Movie 타입 정의
interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  overview?: string;
}

interface WishlistState {
  wishlist: Movie[];
}

type WishlistAction =
  | { type: 'ADD_TO_WISHLIST'; movie: Movie }
  | { type: 'REMOVE_FROM_WISHLIST'; movieId: number }
  | { type: 'SET_WISHLIST'; movies: Movie[] };

// 초기 상태
const initialState: WishlistState = {
  wishlist: [],
};

// Reducer 함수
const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      return { ...state, wishlist: [...state.wishlist, action.movie] };
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter((movie) => movie.id !== action.movieId),
      };
    case 'SET_WISHLIST':
      return { ...state, wishlist: action.movies };
    default:
      return state;
  }
};

// Context 생성
const WishlistContext = createContext<{
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
} | null>(null);

interface WishlistProviderProps {
  children: ReactNode; // children 타입을 명시적으로 정의
}

// WishlistProvider 컴포넌트
export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // 로컬 스토리지에서 위시리스트를 로드
  useEffect(() => {
    const storedWishlist = localStorage.getItem('movieWishlist');
    if (storedWishlist) {
      dispatch({ type: 'SET_WISHLIST', movies: JSON.parse(storedWishlist) });
    }
  }, []);

  // 로컬 스토리지에 위시리스트 저장
  useEffect(() => {
    localStorage.setItem('movieWishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Hook을 통해 Context 사용
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
