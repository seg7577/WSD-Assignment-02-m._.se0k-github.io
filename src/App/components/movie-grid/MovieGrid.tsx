import React, { useState, useEffect } from 'react';
// React에서 useState와 useEffect 훅을 가져옵니다. 상태 관리와 사이드 이펙트 처리를 위해 사용됩니다.

import './MovieGrid.css';
// 이 컴포넌트의 스타일링을 위해 CSS 파일을 가져옵니다.

const MovieGrid = ({
  fetchUrl,
  rowSize,
  getImageUrl,
  toggleWishlist,
  isInWishlist,
}: {
  fetchUrl: string; // 영화 데이터를 가져올 API URL
  rowSize: number; // 한 페이지에 표시할 영화의 개수
  getImageUrl: (path: string) => string; // 영화 포스터의 URL을 가져오는 함수
  toggleWishlist: (movie: any) => void; // 위시리스트에 추가/제거하는 함수
  isInWishlist: (id: number) => boolean; // 영화가 위시리스트에 있는지 확인하는 함수
}) => {
  const [movies, setMovies] = useState<any[]>([]);
  // 영화 데이터를 저장하는 상태입니다. 초기값은 빈 배열입니다.

  const [currentPage, setCurrentPage] = useState(1);
  // 현재 페이지 번호를 저장하는 상태입니다. 초기값은 1입니다.

  useEffect(() => {
    // fetchUrl이 변경될 때마다 실행되는 사이드 이펙트입니다.

    const fetchMovies = async () => {
      try {
        const response = await fetch(fetchUrl);
        console.log('Response:', response); // 응답 상태와 데이터 확인
    
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
    
        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid Content-Type: Expected application/json');
        }
    
        const data = await response.json();
        console.log('Data:', data); // 데이터 출력
    
        if (data.results && Array.isArray(data.results)) {
          setMovies(data.results);
        } else {
          console.error('Invalid data structure:', data);
          setMovies([]);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    
    console.log('Movies:', movies);
    console.log('Visible Movies:', visibleMovies);
    

    fetchMovies();
    // fetchMovies 함수를 호출하여 데이터를 가져옵니다.
  }, [fetchUrl]);
  // fetchUrl이 변경될 때마다 useEffect가 실행됩니다.

  const totalPages = Math.ceil(movies.length / rowSize);
  // 총 페이지 수를 계산합니다. 영화 배열을 rowSize로 나눈 값을 올림 처리합니다.

  const visibleMovies = movies.slice(
    (currentPage - 1) * rowSize,
    currentPage * rowSize
    
  );
  // 현재 페이지에 표시할 영화를 계산합니다.
  // slice를 사용하여 (currentPage - 1) * rowSize부터 currentPage * rowSize까지의 영화를 추출합니다.
  
  return (
    <div className="movie-grid">
      {/* 영화 그리드를 감싸는 최상위 컨테이너입니다. */}

      <div className="grid-container">
        {/* 영화 카드들이 배치될 그리드 컨테이너입니다. */}

        {visibleMovies.map((movie) => (
          // 현재 페이지에 표시될 각 영화를 렌더링합니다.
          <div
            key={movie.id}
            className="movie-card"
            // 영화 카드의 고유 ID를 키로 사용합니다.
            onClick={() => toggleWishlist(movie)}
            // 영화 카드를 클릭하면 위시리스트 추가/제거 동작이 실행됩니다.
          >
            <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
            {/* 영화 포스터 이미지입니다. getImageUrl 함수를 사용해 포스터 경로를 가져옵니다. */}

            <div className="movie-title">{movie.title}</div>
            {/* 영화 제목을 표시합니다. */}

            {isInWishlist(movie.id) && (
              // 영화가 위시리스트에 있으면 위시리스트 표시 아이콘을 렌더링합니다.
              <div className="wishlist-indicator">👍</div>
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        // 페이지가 여러 개인 경우에만 페이지네이션 컨트롤을 표시합니다.
        <div className="pagination">
          {/* 페이지네이션 컨테이너입니다. */}

          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
            이전
          </button>
          {/* 이전 페이지 버튼. 페이지가 1보다 작아지지 않도록 Math.max를 사용합니다. */}

          <span>
            {currentPage} / {totalPages}
          </span>
          {/* 현재 페이지 번호와 총 페이지 수를 표시합니다. */}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            다음
          </button>
          {/* 다음 페이지 버튼. 페이지가 totalPages를 초과하지 않도록 Math.min을 사용합니다. */}
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
// MovieGrid 컴포넌트를 기본 내보내기로 export합니다.
