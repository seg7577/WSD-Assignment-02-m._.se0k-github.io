import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // AuthContext에서 데이터 가져오기
import { ToastContext } from '../toast/ToastContainer'; // Toast 메시지 처리
import './SignIn.css';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignIn, setIsSignIn] = useState(true); // Sign In / Sign Up 상태 전환
  const toastContext = useContext(ToastContext);
  const navigate = useNavigate();
  const { login, setIsAuthenticated, register } = useAuth(); // `setIsAuthenticated` 추가

  // 로그인 핸들러
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password); // AuthContext의 login 함수 호출
      toastContext?.addToast('로그인 성공!', 'success'); // 성공 메시지
      setIsAuthenticated(true); // 인증 상태 갱신
      navigate('/'); // 홈 페이지로 이동
      console.log('isAuthenticated:', '호출');
    } catch (err) {
      toastContext?.addToast('로그인 실패: 이메일 또는 비밀번호를 확인하세요.', 'error'); // 실패 메시지
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // 회원가입 핸들러
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      await register(email, password); // AuthContext의 register 함수 호출
      toastContext?.addToast('회원가입 성공!', 'success'); // 성공 메시지
      setIsSignIn(true); // 회원가입 후 로그인 화면으로 전환
    } catch (err) {
      toastContext?.addToast('회원가입 실패: 이미 존재하는 이메일입니다.', 'error'); // 실패 메시지
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="card">
        {isSignIn ? (
          <>
            <h1>Sign In</h1>
            <form onSubmit={handleLogin}>
              <div className="input">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div className="account-check">
                Don't have an account?{' '}
                <b onClick={() => setIsSignIn(false)}>Sign up</b>
              </div>
            </form>
          </>
        ) : (
          <>
            <h1>Sign Up</h1>
            <form onSubmit={handleRegister}>
              <div className="input">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
              </button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div className="account-check">
                Already have an account?{' '}
                <b onClick={() => setIsSignIn(true)}>Sign in</b>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
