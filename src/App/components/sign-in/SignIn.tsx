import React, { useState } from 'react'; // React와 useState 훅 가져오기
import './SignIn.css'; // SignIn 컴포넌트에 적용할 CSS 파일 가져오기

const SignIn = () => {
  // 상태 관리
  const [isLoginVisible, setIsLoginVisible] = useState(true); // 현재 보이는 카드가 로그인인지 여부
  const [email, setEmail] = useState(''); // 로그인 이메일 상태
  const [password, setPassword] = useState(''); // 로그인 비밀번호 상태
  const [registerEmail, setRegisterEmail] = useState(''); // 회원가입 이메일 상태
  const [registerPassword, setRegisterPassword] = useState(''); // 회원가입 비밀번호 상태
  const [confirmPassword, setConfirmPassword] = useState(''); // 회원가입 비밀번호 확인 상태
  const [rememberMe, setRememberMe] = useState(false); // 로그인 시 'Remember me' 체크박스 상태
  const [acceptTerms, setAcceptTerms] = useState(false); // 회원가입 시 'Terms and Conditions' 체크박스 상태

  // 로그인 카드와 회원가입 카드 전환
  const toggleCard = () => setIsLoginVisible(!isLoginVisible);

  // 로그인 폼 제출 처리
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault(); // 기본 동작 방지 (페이지 새로고침 방지)
    console.log('Login:', { email, password, rememberMe }); // 로그인 상태 출력
  };

  // 회원가입 폼 제출 처리
  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault(); // 기본 동작 방지
    console.log('Register:', { registerEmail, registerPassword, confirmPassword, acceptTerms }); // 회원가입 상태 출력
  };

  return (
    <div>
      <div className="bg-image"></div> {/* 배경 이미지 */}
      <div className="container">
        <div id="phone">
          <div id="content-wrapper">
            {/* 로그인 카드 */}
            <div className={`card ${!isLoginVisible ? 'hidden' : ''}`} id="login">
              <form onSubmit={handleLogin}>
                <h1>Sign in</h1> {/* 로그인 제목 */}
                <div className="input">
                  {/* 이메일 입력 필드 */}
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // 이메일 상태 업데이트
                  />
                  <label htmlFor="email">Username or Email</label> {/* 이메일 라벨 */}
                </div>
                <div className="input">
                  {/* 비밀번호 입력 필드 */}
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // 비밀번호 상태 업데이트
                  />
                  <label htmlFor="password">Password</label> {/* 비밀번호 라벨 */}
                </div>
                <span className="checkbox remember">
                  {/* 'Remember me' 체크박스 */}
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)} // Remember me 상태 업데이트
                  />
                  <label htmlFor="remember" className="read-text">Remember me</label>
                </span>
                <span className="checkbox forgot">
                  <a href="#">Forgot Password?</a> {/* 비밀번호 찾기 링크 */}
                </span>
                <button disabled={!email || !password}>Login</button> {/* 이메일/비밀번호가 없으면 비활성화 */}
              </form>
              <a href="#" className="account-check" onClick={toggleCard}>
                Don't have an account? <b>Sign up</b> {/* 회원가입으로 전환 */}
              </a>
            </div>

            {/* 회원가입 카드 */}
            <div className={`card ${isLoginVisible ? 'hidden' : ''}`} id="register">
              <form onSubmit={handleRegister}>
                <h1>Sign up</h1> {/* 회원가입 제목 */}
                <div className="input">
                  {/* 회원가입 이메일 입력 필드 */}
                  <input
                    id="register-email"
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)} // 회원가입 이메일 상태 업데이트
                  />
                  <label htmlFor="register-email">Email</label>
                </div>
                <div className="input">
                  {/* 회원가입 비밀번호 입력 필드 */}
                  <input
                    id="register-password"
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)} // 회원가입 비밀번호 상태 업데이트
                  />
                  <label htmlFor="register-password">Password</label>
                </div>
                <div className="input">
                  {/* 비밀번호 확인 입력 필드 */}
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} // 비밀번호 확인 상태 업데이트
                  />
                  <label htmlFor="confirm-password">Confirm Password</label>
                </div>
                <span className="checkbox remember">
                  {/* 'Terms and Conditions' 체크박스 */}
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)} // 약관 동의 상태 업데이트
                  />
                  <label htmlFor="terms" className="read-text">I have read <b>Terms and Conditions</b></label>
                </span>
                <button disabled={!registerEmail || !registerPassword || !acceptTerms}>Register</button> {/* 이메일/비밀번호/약관 동의 체크가 없으면 비활성화 */}
              </form>
              <a href="#" className="account-check" onClick={toggleCard}>
                Already have an account? <b>Sign in</b> {/* 로그인으로 전환 */}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
