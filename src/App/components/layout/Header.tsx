import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Headr.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isHidden, setIsHidden] = useState(false); // 헤더 숨김 상태 관리
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // 드롭다운 표시 상태
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // 사용자 정보와 로그아웃 함수 가져오기
  const lastScrollPosition = useRef(0); // 마지막 스크롤 위치 저장 (useRef를 사용하여 상태 유지)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      if (currentScrollPosition > lastScrollPosition.current) {
        setIsHidden(true); // 아래로 스크롤하면 헤더 숨김
      } else {
        setIsHidden(false); // 위로 스크롤하면 헤더 보임
      }
      lastScrollPosition.current = currentScrollPosition; // 마지막 스크롤 위치 업데이트
    };

    window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 등록
    return () => window.removeEventListener('scroll', handleScroll); // 컴포넌트 언마운트 시 이벤트 제거
  }, []);

  const handleAuthClick = () => {
    if (user) {
      logout(); // 로그아웃
      alert('로그아웃 되었습니다.');
      navigate('/'); // 홈 페이지로 이동
    } else {
      navigate('/signin'); // 로그인 페이지로 이동
    }
  };

  return (
    <div id="container">
      <header className={`app-header ${isHidden ? 'hidden' : ''}`}>
        {/* 헤더 */}
        <div className="header-left">
          {/* 헤더 왼쪽 */}
          <div className="logo">
            <Link to="/">
              <i className="fas fa-ticket" style={{ color: '#E50914' }}></i>
            </Link>
          </div>
          <nav className="nav-links desktop-nav">
            {/* 데스크톱용 네비게이션 */}
            <ul>
              <li><Link to="/">홈</Link></li>
              <li><Link to="/popular">대세 콘텐츠</Link></li>
              <li><Link to="/wishlist">내가 찜한 리스트</Link></li>
              <li><Link to="/search">찾아보기</Link></li>
            </ul>
          </nav>
        </div>
        <div className="header-right">
          {/* 헤더 오른쪽 */}
          <button className="login-logout-button" onClick={handleAuthClick}>
            {user ? '로그아웃' : '로그인'}
          </button>
          <div
            className="user-icon"
            onMouseEnter={() => setIsDropdownVisible(true)} // 마우스 올릴 때 드롭다운 표시
            onMouseLeave={() => setIsDropdownVisible(false)} // 마우스 벗어날 때 드롭다운 숨김
          >
            <i className="fas fa-user"></i>
            {isDropdownVisible && (
              <div className="dropdown">
                {/* 사용자 ID 표시 */}
                <p>{user?.id || 'Guest'}</p>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
