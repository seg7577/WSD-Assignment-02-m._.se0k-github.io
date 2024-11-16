import React, { createContext, useReducer, useContext, useEffect } from 'react';

// Movie 타입 정의 -> 영화의 데이토 구조를 정의
interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  overview?: string;
}

interface WishlistState { //위시리스트 상태, 영화 객체의 배열임
  wishlist: Movie[];
}

type WishlistAction =
//액션 타입과 페이로드를 정의함.
  | { type: 'ADD_TO_WISHLIST'; movie: Movie }//새로운 영화를 위시리스트에 추가, 페이로드 -> 영화객체
  | { type: 'REMOVE_FROM_WISHLIST'; movieId: number }//위시리스트에서 특정영화를 제거, 페이로드 -> 영화의 고유 ID
  | { type: 'SET_WISHLIST'; movies: Movie[] }; //위시리스트를 초기화하거나 로컬 저장소 데이터를 설정, 페이로드 -> 영화배열

const initialState: WishlistState = { //초기 상태(위시리스트는 초기에는 비어있음)
  wishlist: [],
};

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      return { ...state, wishlist: [...state.wishlist, action.movie] };
      //ADD_TO_WISHLIST: 기존 상태의 wishlist 배열에 새로운 영화를 추가.
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter((movie) => movie.id !== action.movieId),
        //REMOVE_FROM_WISHLIST: filter를 사용하여 특정 movieId와 일치하지 않는 영화만 유지.
      };
    case 'SET_WISHLIST':
      return { ...state, wishlist: action.movies };
      //SET_WISHLIST:위시리스트를 전달된 movies 배열로 설정.
    default:
      return state;
      //default:정의되지 않은 액션일 경우, 기존 상태를 그대로 반환.
  }
};

const WishlistContext = createContext<{
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
} | null>(null);
//Context를 생성 : 1. state: 현재 위시리스트 상태. 2. dispatch: useReducer에서 제공하는 액션 디스패처.

interface WishlistProviderProps {
  children: React.ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  //WishlistProvider 컴포넌트

  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  //wishlistReducer와 initialState를 사용해 상태와 액션 디스패처를 생성.


  useEffect(() => {
    //로컬 저장소 초기화 : 컴포넌트가 처음 렌더링될 때(useEffect), localStorage에서 저장된 위시리스트 데이터를 가져와 SET_WISHLIST 액션을 디스패치.
    const storedWishlist = localStorage.getItem('movieWishlist');
    if (storedWishlist) {
      dispatch({ type: 'SET_WISHLIST', movies: JSON.parse(storedWishlist) });
    }
  }, []);

  useEffect(() => {
    //업데이트: state.wishlist가 변경될 때마다, 변경된 데이터를 localStorage에 저장.
    localStorage.setItem('movieWishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  return (
    //WishlistContext.Provider: state와 dispatch를 하위 컴포넌트에 제공.
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
