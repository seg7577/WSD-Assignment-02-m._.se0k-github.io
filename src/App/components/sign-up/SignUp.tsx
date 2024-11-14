import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
  // 상태 관리
  const [email, setEmail] = useState(''); // 이메일 입력값 상태
  const [password, setPassword] = useState(''); // 비밀번호 입력값 상태
  const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 입력값 상태
  const [acceptTerms, setAcceptTerms] = useState(false); // 약관 동의 체크박스 상태

  // 회원가입 폼 제출 처리
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password === confirmPassword) {
      console.log('SignUp Success:', { email, password, acceptTerms });
    } else {
      console.error('Passwords do not match!');
    }
  };

  return (
    <div>
      <div className="bg-image"></div> {/* 배경 이미지 */}
      <div className="container">
        <div id="phone">
          <div id="content-wrapper">
            <div className="card" id="register">
              <form onSubmit={handleSubmit}>
                <h1>Sign up</h1>
                <div className="input">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="input">
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="confirm-password">Confirm Password</label>
                </div>
                <span className="checkbox terms">
                  <input
                    type="checkbox"
                    id="accept-terms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    required
                  />
                  <label htmlFor="accept-terms">
                    I agree to the <b>Terms and Conditions</b>
                  </label>
                </span>
                <button disabled={!email || !password || !acceptTerms}>
                  Register
                </button>
              </form>
              <a href="/signin" className="account-check">
                Already have an account? <b>Sign in</b>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
