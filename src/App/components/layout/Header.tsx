import React, { useState, useEffect } from 'react';
// React 및 상태 관리(useState), 생명주기(useEffect) 훅을 가져옵니다.

import { Link, useNavigate } from 'react-router-dom';
// React Router의 Link와 useNavigate를 가져옵니다. Link는 페이지 이동 링크를 생성하며, useNavigate는 프로그래밍 방식의 페이지 전환을 지원합니다.

import './Headr.css';
// 헤더 컴포넌트에 대한 스타일을 정의한 CSS 파일을 가져옵니다.

import '@fortawesome/fontawesome-free/css/all.min.css';
// FontAwesome 아이콘을 사용하기 위한 CSS 파일을 가져옵니다.

import { useAuth } from '../../context/AuthContext';
// 로그인/로그아웃 상태를 관리하는 AuthContext를 가져옵니다.

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  // 스크롤 상태를 관리합니다. 초기값은 false로 설정되어 헤더는 기본 스타일을 가집니다.

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // 모바일 메뉴의 열림 상태를 관리합니다. 초기값은 닫힌 상태(false)입니다.

  const navigate = useNavigate();
  // 페이지 전환을 위한 React Router의 useNavigate 훅을 사용합니다.

  const { user, logout } = useAuth();
  // AuthContext에서 user(로그인된 사용자)와 logout(로그아웃 함수)를 가져옵니다.

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 로그인 여부를 확인하기 위한 상태입니다. 초기값은 false입니다.

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      // 스크롤 위치가 50px 이상일 경우 isScrolled를 true로 설정하여 헤더 스타일을 변경합니다.
    };

    window.addEventListener('scroll', handleScroll);
    // 스크롤 이벤트 리스너를 등록하여 스크롤 상태를 감지합니다.

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    };
  }, []);
  // useEffect 훅을 사용해 컴포넌트가 마운트 및 언마운트될 때 스크롤 이벤트를 관리합니다.

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // 모바일 메뉴를 열거나 닫는 상태를 반전시킵니다.
  };

  const handleAuthClick = () => {
    if (user) {
      logout();
      // 사용자가 로그인된 상태일 경우 logout 함수를 호출하여 로그아웃 처리.

      alert('로그아웃 되었습니다.');
      // 로그아웃 완료 메시지를 알림창으로 표시합니다.

      navigate('/');
      // 로그아웃 후 홈 페이지로 이동합니다.
    } else {
      navigate('/signin');
      // 사용자가 로그인되지 않은 경우 로그인 페이지로 이동합니다.
    }
  };

  return (
    <div id="container">
      {/* 전체 헤더를 감싸는 컨테이너 */}
      <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
        {/* 헤더 컴포넌트. 스크롤 상태에 따라 클래스가 동적으로 추가됩니다. */}
        <div className="header-left">
          {/* 헤더의 왼쪽 영역 */}
          <div className="logo">
            {/* 로고 영역 */}
            <Link to="/">
              {/* 로고를 클릭하면 홈 페이지로 이동 */}
              <i className="fas fa-ticket" style={{ color: '#E50914' }}></i>
              {/* 로고 아이콘 */}
            </Link>
          </div>
          <nav className="nav-links desktop-nav">
            {/* 데스크톱 환경용 내비게이션 메뉴 */}
            <ul>
              <li><Link to="/">홈</Link></li>
              {/* 홈 페이지로 이동하는 링크 */}
              <li><Link to="/popular">대세 콘텐츠</Link></li>
              {/* 대세 콘텐츠 페이지로 이동하는 링크 */}
              <li><Link to="/wishlist">내가 찜한 리스트</Link></li>
              {/* 찜한 리스트 페이지로 이동하는 링크 */}
              <li><Link to="/search">찾아보기</Link></li>
              {/* 찾아보기 페이지로 이동하는 링크 */}
            </ul>
          </nav>
        </div>
        <div className="header-right">
          {/* 헤더의 오른쪽 영역 */}
          <button className="login-logout-button" onClick={handleAuthClick}>
            {/* 로그인/로그아웃 버튼. 클릭 시 handleAuthClick 함수 호출 */}
            {user ? '로그아웃' : '로그인'}
            {/* 로그인 상태에 따라 버튼 텍스트가 '로그아웃' 또는 '로그인'으로 표시 */}
          </button>
          <button className="icon-button" onClick={handleAuthClick}>
            {/* 사용자 아이콘 버튼 */}
            <i className="fas fa-user"></i>
            {/* 사용자 아이콘 */}
          </button>
        </div>
      </header>

      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        {/* 모바일 네비게이션 메뉴. 상태에 따라 클래스가 동적으로 추가됩니다. */}
        <button className="close-button" onClick={toggleMobileMenu}>
          {/* 닫기 버튼 */}
          <i className="fas fa-times"></i>
          {/* 닫기 아이콘 */}
        </button>
        <nav>
          <ul>
            <li><Link to="/" onClick={toggleMobileMenu}>홈</Link></li>
            {/* 모바일 메뉴의 홈 링크. 클릭 시 메뉴가 닫힙니다. */}
            <li><Link to="/popular" onClick={toggleMobileMenu}>대세 콘텐츠</Link></li>
            {/* 모바일 메뉴의 대세 콘텐츠 링크 */}
            <li><Link to="/wishlist" onClick={toggleMobileMenu}>내가 찜한 리스트</Link></li>
            {/* 모바일 메뉴의 찜한 리스트 링크 */}
            <li><Link to="/search" onClick={toggleMobileMenu}>찾아보기</Link></li>
            {/* 모바일 메뉴의 찾아보기 링크 */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
// Header 컴포넌트를 export하여 다른 파일에서 사용할 수 있도록 만듭니다.
