import React, { useState, useEffect } from 'react'; // React와 필요한 Hooks(useState, useEffect) 가져오기
import { Link, useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 React Router의 Link 컴포넌트 가져오기
import './Headr.css'; // 헤더 스타일을 정의한 CSS 파일 가져오기
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useAuth} from '../../context/AuthContext';

const Header = () => {
  // 상태 관리: 스크롤 여부와 모바일 메뉴 열림 여부를 관리
  const [isScrolled, setIsScrolled] = useState(false); // 헤더가 스크롤에 따라 스타일을 변경하기 위한 상태
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 모바일 메뉴가 열려 있는지 여부를 저장
  const navigate = useNavigate(); // 페이지 전환을 위한 useNavigate
  const { user, logout } = useAuth(); // Context에서 user와 logout 함수 사용
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  // 스크롤 이벤트 핸들링
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // 스크롤 위치가 50px 이상이면 isScrolled를 true로 설정
    };

    // 컴포넌트가 마운트될 때 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);
    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 모바일 메뉴 열고 닫기 토글 함수
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // 현재 상태의 반대값으로 업데이트
  };


  
  // 사용자 아이콘 클릭 처리
  const handleAuthClick = () => {
    if (user) {
      logout(); // 로그인 상태일 경우 로그아웃
      alert('로그아웃 되었습니다.');
      navigate('/'); // 홈 화면으로 이동
    } else {
      navigate('/signin'); // 비로그인 상태일 경우 로그인 페이지로 이동
    }
  };

  // JSX 반환
  return (
    <div id="container"> {/* 전체 헤더를 감싸는 컨테이너 */}
      <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}> {/* 스크롤 여부에 따라 클래스 동적 추가 */}
        <div className="header-left"> {/* 헤더 왼쪽 영역 */}
          <div className="logo"> {/* 로고 영역 */}
            <Link to="/"> {/* 홈페이지로 이동하는 링크 */}
              <i className="fas fa-ticket" style={{ color: '#E50914' }}></i> {/* 아이콘 표시 */}
            </Link>
          </div>
          <nav className="nav-links desktop-nav"> {/* 데스크톱용 네비게이션 메뉴 */}
            <ul>
              <li><Link to="/">홈</Link></li> {/* 홈 링크 */}
              <li><Link to="/popular">대세 콘텐츠</Link></li> {/* 대세 콘텐츠 링크 */}
              <li><Link to="/wishlist">내가 찜한 리스트</Link></li> {/* 찜한 리스트 링크 */}
              <li><Link to="/search">찾아보기</Link></li> {/* 찾아보기 링크 */}
            </ul>
          </nav>
        </div>
        <div className="header-right"> {/* 헤더 오른쪽 영역 */}
          <button
            className="login-logout-button" onClick={handleAuthClick}>
            {user ? '로그아웃' : '로그인'} {/* 상태에 따라 버튼 텍스트 변경 */}
          </button>
          <button className="icon-button" onClick={handleAuthClick}> {/* 사용자 프로필 이동 버튼 */}
            <i className="fas fa-user"></i> {/* 사용자 아이콘 */}
          </button>
        </div>
      </header>

      {/* 모바일 네비게이션 메뉴 */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}> {/* 모바일 메뉴 열림 여부에 따라 클래스 동적 추가 */}
        <button className="close-button" onClick={toggleMobileMenu}> {/* 닫기 버튼 */}
          <i className="fas fa-times"></i> {/* 닫기 아이콘 */}
        </button>
        <nav>
          <ul>
            <li><Link to="/" onClick={toggleMobileMenu}>홈</Link></li> {/* 홈 링크 */}
            <li><Link to="/popular" onClick={toggleMobileMenu}>대세 콘텐츠</Link></li> {/* 대세 콘텐츠 링크 */}
            <li><Link to="/wishlist" onClick={toggleMobileMenu}>내가 찜한 리스트</Link></li> {/* 찜한 리스트 링크 */}
            <li><Link to="/search" onClick={toggleMobileMenu}>찾아보기</Link></li> {/* 찾아보기 링크 */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header; // 컴포넌트를 다른 파일에서 사용할 수 있도록 내보내기