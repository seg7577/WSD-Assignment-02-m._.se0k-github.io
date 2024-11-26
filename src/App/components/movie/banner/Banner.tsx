import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import './Banner.css';
interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
}

interface TMDBResponse {
  results: Movie[];
}

const Banner: React.FC = () => {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null); // 대표 영화 상태
  const { user } = useAuth(); // 현재 로그인된 사용자 정보 가져오기

  useEffect(() => {
    if (!user || !user.password) {
      console.error('User is not authenticated or API key is missing.');
      return;
    }

    const fetchFeaturedMovie = async () => {
      try {
        const response = await axios.get<TMDBResponse>(
          'https://api.themoviedb.org/3/movie/popular',
          {
            params: {
              api_key: user.password, // API 키
              language: 'ko-KR', // 한국어 데이터
            },
          }
        );

        const movies = response.data.results; // API 응답에서 영화 데이터 추출
        if (movies && movies.length > 0) {
          setFeaturedMovie(movies[0]); // 첫 번째 영화를 배너로 설정
        }
      } catch (error) {
        console.error('Error fetching featured movie:', error);
      }
    };

    fetchFeaturedMovie(); // API 호출
  }, [user]); // user가 변경될 때마다 실행

  const getImageUrl = (path: string) => `https://image.tmdb.org/t/p/original${path}`;

  if (!featuredMovie) {
    return <div>Loading...</div>; // 데이터 로딩 중 표시
  }

  return (
    <div className="banner"
      style={{
        height: '60vh', // 화면 높이의 60%
        maxWidth: '95vw', // 뷰포트 너비의 95%
        backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`, // 동적으로 배경 이미지 설정
        backgroundSize: 'cover', // 배경 이미지 크기
        backgroundPosition: 'center', // 배경 이미지 위치
        color: 'white', // 텍스트 색상
        display: 'flex', // 플렉스 컨테이너 설정
        alignItems: 'flex-end', // 컨테이너 하단에 정렬
        marginTop: '70px', // 상단 여백
        
      }}>
      <div className="banner-content">
        <h1>{featuredMovie.title}</h1>
        <p>{featuredMovie.overview}</p>
        <button type="submit">재생</button>
        <button type="submit">상세 정보</button>
      </div>
    </div>
  );
};

export default Banner;
