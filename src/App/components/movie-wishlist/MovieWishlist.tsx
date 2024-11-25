// import React, { useState } from 'react';
// import './MovieWishlist.css';

// // 컴포넌트 시작: 위시리스트를 표시하는 컴포넌트

// const MovieWishlist = () => {
//   const [currentView, setCurrentView] = useState<'grid' | 'list'>('grid'); // 현재 보기를 'grid' 또는 'list'로 설정
//   const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
//   const [wishlistMovies, setWishlistMovies] = useState<any[]>([]); // 위시리스트에 저장된 영화 목록
//   const rowSize = 5; // 한 줄에 표시할 영화 수
//   const totalPages = Math.ceil(wishlistMovies.length / rowSize); // 전체 페이지 수 계산

//   const toggleWishlist = (movie: any) => {
//     // 위시리스트에서 영화를 추가/제거
//     const updatedMovies = wishlistMovies.filter((item) => item.id !== movie.id); // 선택한 영화 제외
//     setWishlistMovies(updatedMovies); // 업데이트된 위시리스트 설정
//   };

//   const getImageUrl = (path: string) => `https://image.tmdb.org/t/p/w500${path}`; // 영화 포스터 이미지 URL 생성

//   const visibleWishlistMovies = wishlistMovies.slice(
//     (currentPage - 1) * rowSize,
//     currentPage * rowSize
//   ); // 현재 페이지에 표시할 영화 계산

//   const prevPage = () => {
//     // 이전 페이지로 이동
//     if (currentPage > 1) setCurrentPage(currentPage - 1); // 현재 페이지가 1보다 크면 감소
//   };

//   const nextPage = () => {
//     // 다음 페이지로 이동
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1); // 현재 페이지가 총 페이지보다 작으면 증가
//   };

//   return (
//     <div className="movie-grid">
//       {/* 영화 위시리스트 표시 영역 */}
//       <div className={`grid-container ${currentView}`}>
//         {/* 그리드 또는 리스트 보기 */}
//         {visibleWishlistMovies.map((movieGroup, i) => (
//           // 현재 페이지의 영화 그룹 반복 렌더링
//           <div
//             key={i}
//             className={`movie-row ${movieGroup.length === rowSize ? 'full' : ''}`}
//           >
//             {/* 영화 그룹 내 각 영화 렌더링 */}
//             {movieGroup.map((movie: any) => (
//               <div
//                 key={movie.id}
//                 className="movie-card"
//                 onClick={() => toggleWishlist(movie)}
//               >
//                 {/* 영화 카드 클릭 시 위시리스트에서 제거 */}
//                 <img src={getImageUrl(movie.poster_path)} alt={movie.title} /> {/* 영화 포스터 */}
//                 <div className="movie-title">{movie.title}</div> {/* 영화 제목 */}
//                 <div className="wishlist-indicator">👍</div> {/* 위시리스트 표시 아이콘 */}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//       {wishlistMovies.length === 0 && (
//         // 위시리스트가 비어 있을 때 표시되는 메시지
//         <div className="empty-wishlist">위시리스트가 비어 있습니다.</div>
//       )}
//       {totalPages > 1 && (
//         // 페이지네이션 표시
//         <div className="pagination">
//           <button onClick={prevPage} disabled={currentPage === 1}>
//             {/* 이전 버튼 */}
//             &lt; 이전
//           </button>
//           <span>{currentPage} / {totalPages}</span> {/* 현재 페이지 / 총 페이지 표시 */}
//           <button onClick={nextPage} disabled={currentPage === totalPages}>
//             {/* 다음 버튼 */}
//             다음 &gt;
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MovieWishlist;
// // 컴포넌트 끝: 위시리스트 UI 렌더링 및 페이지네이션 기능 포함
// import React, { useEffect, useState } from 'react';
// import MovieInfiniteScroll from '../movie-infinite-scroll/MovieInfiniteScroll';
// import './MovieWishlist.css';

// interface Movie {
//   id: number;
//   poster_path: string;
//   title: string;
// }

// const MovieWishlist = () => {
//   const [wishlistMovies, setWishlistMovies] = useState<Movie[]>([]);

//   // 로컬 스토리지에서 데이터 로드
//   useEffect(() => {
//     const storedWishlist = localStorage.getItem('wishlist');
//     if (storedWishlist) {
//       setWishlistMovies(JSON.parse(storedWishlist));
//     }
//   }, []);

//   // 이미지 URL 생성 함수
//   const getImageUrl = (path: string) => `https://image.tmdb.org/t/p/w500${path}`;

//   // 위시리스트 추가/제거 함수
//   const toggleWishlist = (movie: Movie) => {
//     const updatedWishlist = wishlistMovies.filter((item) => item.id !== movie.id);
//     setWishlistMovies(updatedWishlist);
//     localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
//   };

//   // 위시리스트 확인 함수
//   const isInWishlist = (id: number) => wishlistMovies.some((movie) => movie.id === id);

//   return (
//     <div className="wishlist-page">
//       <h2>My Wishlist</h2>
//       {wishlistMovies.length > 0 ? (
//         <MovieInfiniteScroll
//           movies={wishlistMovies} // 로컬 스토리지에서 로드된 영화 데이터 전달
//           getImageUrl={getImageUrl} // 이미지 URL 생성 함수 전달
//           toggleWishlist={toggleWishlist} // 위시리스트 추가/제거 함수 전달
//           isInWishlist={isInWishlist} // 위시리스트 확인 함수 전달
//         />
//       ) : ( 
//         <p>Your wishlist is empty.</p>
//       )}
//     </div>
//   );
// };

// export default MovieWishlist;
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
