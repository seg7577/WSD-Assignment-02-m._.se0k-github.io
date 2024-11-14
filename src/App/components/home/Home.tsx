import React from 'react'; // React 라이브러리를 가져옵니다.
import Header from '../layout/Header'; // 헤더 컴포넌트를 가져옵니다.
import HomeMain from './main/HomeMain'; // 홈 메인 컴포넌트를 가져옵니다.
import './Home.css'; // Home 컴포넌트의 스타일을 정의한 CSS 파일을 가져옵니다.
import '../movie-row/MovieRow';

const Home = () => {
  return (
    <div id="app"> 
      {/* 전체 애플리케이션의 루트 컨테이너를 정의하는 div */}
      <Header /> 
      {/* 화면의 상단에 위치할 헤더 컴포넌트를 렌더링 */}
      <div id="container">
        <HomeMain />
        {/* 라우팅된 컴포넌트가 렌더링될 컨테이너 */}
        {/* React Router의 Outlet 컴포넌트를 사용해 라우팅된 컴포넌트를 표시할 수 있습니다. */}
      </div>
    </div>
  );
};

export default Home; 
// Home 컴포넌트를 내보내 다른 파일에서 사용할 수 있도록 설정합니다.
