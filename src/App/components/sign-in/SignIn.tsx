import React, { useState } from 'react';
// React 및 useState 훅을 가져옵니다. useState는 상태 관리를 위한 React 훅입니다.

import { useNavigate } from 'react-router-dom';
// 페이지 전환을 처리하기 위해 useNavigate 훅을 가져옵니다.

import './SignIn.css';
// SignIn 컴포넌트에 필요한 스타일 시트를 가져옵니다.

import { AuthService } from '../../util/auth/auth.service';
// AuthService를 가져옵니다. 로그인 로직을 처리하는 서비스입니다.

import { useAuth } from '../../context/AuthContext';
// AuthContext를 가져옵니다. 로그인 상태와 관련된 로직을 관리하기 위해 사용됩니다.

const SignIn = () => {
  const navigate = useNavigate(); 
  // useNavigate 훅을 사용해 페이지 전환 기능을 활성화합니다.

  const [email, setEmail] = useState('');
  // 이메일 입력 필드의 상태를 관리합니다. 초기값은 빈 문자열입니다.

  const [password, setPassword] = useState('');
  // 비밀번호 입력 필드의 상태를 관리합니다. 초기값은 빈 문자열입니다.

  const [rememberMe, setRememberMe] = useState(false);
  // "Remember me" 체크박스의 상태를 관리합니다. 초기값은 false입니다.

  const [error, setError] = useState('');
  // 에러 메시지의 상태를 관리합니다. 초기값은 빈 문자열입니다.

  const [isLoading, setIsLoading] = useState(false);
  // 로딩 상태를 관리합니다. 로그인 진행 중일 때 true로 설정됩니다.

  const { login } = useAuth();
  // useAuth 훅을 사용해 login 함수(로그인 로직)를 가져옵니다.

  const handleLogin = async (event: React.FormEvent) => {
    // 로그인 폼 제출 시 호출되는 함수입니다.
    event.preventDefault();
    // 폼 제출의 기본 동작(페이지 새로고침)을 방지합니다.
    setIsLoading(true);
    // 로딩 상태를 true로 설정하여 버튼 비활성화 및 로딩 메시지 표시.

    setError('');
    // 에러 메시지를 초기화합니다.

    try {
      await login(email, password);
      // AuthContext의 login 함수를 호출하여 로그인 시도.
      console.log('Login successful');
      // 로그인 성공 메시지를 콘솔에 출력.
      navigate('/');
      // 로그인 성공 시 메인 페이지로 이동합니다.
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      // 로그인 실패 시 에러 메시지를 업데이트합니다.
    } finally {
      setIsLoading(false);
      // 로딩 상태를 false로 설정하여 버튼 비활성화를 해제합니다.
    }
  };

  const goToSignUp = () => {
    // 회원가입 버튼 클릭 시 호출되는 함수입니다.
    navigate('/signup');
    // '/signup' 경로로 페이지를 전환합니다.
  };

  return (
    <div>
      <div className="bg-image"></div>
      {/* 배경 이미지를 표시하는 div. 스타일은 SignIn.css에서 정의됨. */}

      <div className="container">
        {/* 컴포넌트의 중앙 정렬 및 스타일링을 위한 컨테이너 */}
        <div id="phone">
          {/* 디자인적 목적으로 사용되는 ID. */}
          <div id="content-wrapper">
            {/* 로그인 카드를 감싸는 컨텐츠 래퍼 */}
            <div className="card" id="login">
              {/* 로그인 화면을 감싸는 카드 스타일 */}
              <form onSubmit={handleLogin}>
                {/* 로그인 폼. 제출 시 handleLogin 함수 호출 */}
                <h1>Sign in</h1>
                {/* 로그인 화면의 제목 */}
                <div className="input">
                  {/* 이메일 입력 필드 */}
                  <input
                    id="email"
                    type="email"
                    value={email}
                    // 입력된 이메일 값을 상태에 저장.
                    onChange={(e) => setEmail(e.target.value)}
                    // 입력 필드가 변경될 때 호출되어 상태를 업데이트.
                    placeholder="Enter your email"
                    // 입력 필드의 기본 안내 텍스트.
                  />
                  <label htmlFor="email">Username or Email</label>
                  {/* 이메일 입력 필드의 레이블 */}
                </div>
                <div className="input">
                  {/* 비밀번호 입력 필드 */}
                  <input
                    id="password"
                    type="password"
                    value={password}
                    // 입력된 비밀번호 값을 상태에 저장.
                    onChange={(e) => setPassword(e.target.value)}
                    // 입력 필드가 변경될 때 호출되어 상태를 업데이트.
                    placeholder="Enter your password"
                    // 입력 필드의 기본 안내 텍스트.
                  />
                  <label htmlFor="password">Password</label>
                  {/* 비밀번호 입력 필드의 레이블 */}
                </div>
                <span className="checkbox remember">
                  {/* "Remember me" 체크박스 */}
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    // 체크박스의 현재 상태를 상태 값으로 설정.
                    onChange={(e) => setRememberMe(e.target.checked)}
                    // 체크박스 상태가 변경될 때 호출되어 상태를 업데이트.
                  />
                  <label htmlFor="remember">Remember me</label>
                  {/* 체크박스의 레이블 */}
                </span>
                <button type="submit" disabled={!email || !password || isLoading}>
                  {/* 로그인 버튼. 입력 값이 없거나 로딩 중일 때 비활성화 */}
                  {isLoading ? 'Logging in...' : 'Login'}
                  {/* 로딩 중일 때는 "Logging in..." 표시, 그렇지 않으면 "Login" 표시 */}
                </button>
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                {/* 에러 메시지를 빨간색으로 표시. 에러가 없으면 표시되지 않음 */}
              </form>
              <div className="account-check" onClick={goToSignUp}>
                {/* 회원가입 버튼 */}
                Don't have an account? <b>Sign up</b>
                {/* 회원가입 화면으로 이동 안내 텍스트 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
// SignIn 컴포넌트를 export하여 다른 파일에서 사용할 수 있도록 함.
