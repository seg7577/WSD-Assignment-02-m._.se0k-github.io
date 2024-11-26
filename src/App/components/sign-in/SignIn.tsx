import React, { useState,useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ToastContext } from '../layout/toast/ToastContainer';
import './SignIn.css';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../util/auth/authService'; // AuthService를 가져옵니다.
import { useAuth } from '../../context/AuthContext'; // AuthContext를 가져옵니다.

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true); // Sign In 상태 여부
  const navigate = useNavigate(); // 로그인 합체

  // 공통 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // SignIn 전용 상태
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();

  // SignUp 전용 상태
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const toastContext = useContext(ToastContext);

  // 로그인 핸들러
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password); // AuthContext의 login 함수 호출
      toastContext?.addToast('로그인 성공!', 'success'); // 성공 메시지
      alert('로그인 성공!');
      navigate('/'); // 로그인 성공 시 메인 페이지로 이동
    } catch (err) {
      toastContext?.addToast('로그인 실패: 이메일 또는 비밀번호를 확인하세요.', 'error'); // 실패 메시지
      alert('로그인 실패!');
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

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      toastContext?.addToast('비밀번호가 일치하지 않습니다.', 'error');
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!acceptTerms) {
      setError('You must accept the Terms and Conditions.');
      setIsLoading(false);
      return;
    }

    try {
      await AuthService.tryRegister(email, password); // AuthService 회원가입 메서드 호출
      toastContext?.addToast('회원가입 성공!', 'success'); // 성공 메시지
      console.log('Registration successful:', email);
      alert('회원가입 성공!');
      setIsSignIn(true); // 회원가입 성공 후 로그인 화면으로 전환
    } catch (err) {
      toastContext?.addToast('회원가입 실패: 이미 존재하는 이메일입니다.', 'error'); // 실패 메시지
      alert('회원가입 실패: 이미 존재하는 이메일입니다.');
      setError('Registration failed: Email already exists.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="card">
        {/* Sign In 컴포넌트 */}
        <CSSTransition
          in={isSignIn}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          <div key="sign-in">
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
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div className="account-check">
                Don't have an account? <b onClick={() => setIsSignIn(false)}>Sign up</b>
              </div>
            </form>
          </div>
        </CSSTransition>

        {/* Sign Up 컴포넌트 */}
        <CSSTransition
          in={!isSignIn}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          <div key="sign-up">
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
              <div className="input">
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
                <label htmlFor="terms">I agree to the Terms and Conditions</label>
              </div>
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
              </button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div className="account-check">
                Already have an account? <b onClick={() => setIsSignIn(true)}>Sign in</b>
              </div>
            </form>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default Auth;