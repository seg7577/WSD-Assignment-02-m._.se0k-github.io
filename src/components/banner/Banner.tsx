import React from 'react';
import './Banner.css';

interface Movie {
  title: string;
  overview: string;
  backdropUrl: string;
}

const Banner = ({ movie }: { movie: Movie | null }) => {
  if (!movie) {
    return null; // movie가 없을 경우 아무것도 렌더링하지 않음
  }

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${movie.backdropUrl})`,
      }}
    >
      <div className="banner-content">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <button className="play-btn title-btn">재생</button>
        <button className="info-btn title-btn">상세 정보</button>
      </div>
    </div>
  );
};

export default Banner;
