import React, { createContext, useReducer, useContext, useEffect } from 'react';

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

const initialState: WishlistState = {
  wishlist: [],
};

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

const WishlistContext = createContext<{
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
} | null>(null);

interface WishlistProviderProps {
  children: React.ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('movieWishlist');
    if (storedWishlist) {
      dispatch({ type: 'SET_WISHLIST', movies: JSON.parse(storedWishlist) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('movieWishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
