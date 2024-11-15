import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 전환을 위한 useNavigate
import './SignIn.css';
import { AuthService } from '../../util/auth/auth.service'; // AuthService 가져오기
import { useAuth } from '../../context/AuthContext'; // AuthContext 가져오기


const SignIn = () => {
  const navigate = useNavigate(); // 페이지 전환을 위한 useNavigate
  const [email, setEmail] = useState(''); // 이메일 상태
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const [rememberMe, setRememberMe] = useState(false); // "Remember me" 체크박스 상태
  const [error, setError] = useState(''); // 에러 메시지 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const {login} = useAuth();

  // 로그인 폼 제출 처리
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // 기본 폼 제출 동작 방지
    setIsLoading(true); // 로딩 상태 활성화
    setError(''); // 에러 메시지 초기화

    try {
      // AuthService의 로그인 메서드 호출
      await login(email, password);
      console.log('Login successful'); // 성공 로그
      navigate('/'); // 로그인 성공 시 메인 페이지로 이동
    } catch (err) {
      // 로그인 실패 시 에러 메시지 설정
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false); // 로딩 상태 비활성화
    }
  };

  // 회원가입 버튼 클릭 시 SignUp 페이지로 이동
  const goToSignUp = () => {
    navigate('/signup'); // '/signup' 경로로 이동
  };

  return (
    <div>
      <div className="bg-image"></div> {/* 배경 이미지 */}
      <div className="container">
        <div id="phone">
          <div id="content-wrapper">
            <div className="card" id="login">
              <form onSubmit={handleLogin}>
                <h1>Sign in</h1>
                <div className="input">{/* 이메일 입력 필드 */}
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                  <label htmlFor="email">Username or Email</label>
                </div>
                <div className="input"> {/*비밀번호 입력 필드 */}
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <span className="checkbox remember"> {/* 약관 동의 필드 */}
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember">Remember me</label>
                </span>
                <button type="submit" disabled={!email || !password || isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>} {/* 에러 메시지 */}
              </form>
              <div className="account-check" onClick={goToSignUp}>
                Don't have an account? <b>Sign up</b> {/* 회원가입 화면으로 전환 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
