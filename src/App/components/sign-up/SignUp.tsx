import React, { useState } from 'react';
import './SignUp.css';
import { AuthService } from '../../util/auth/auth.service'; // AuthService 가져오기
import { useNavigate } from 'react-router-dom'; // 페이지 전환을 위한 useNavigate

const SignUp = () => {
  // 상태 관리
  const navigate = useNavigate(); // 페이지 전환을 위한 useNavigate 훅
  const [email, setEmail] = useState(''); // 이메일 입력값 상태
  const [password, setPassword] = useState(''); // 비밀번호 입력값 상태
  const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 입력값 상태
  const [acceptTerms, setAcceptTerms] = useState(false); // 약관 동의 체크박스 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(''); // 에러 메시지 상태

  // 회원가입 폼 제출 처리 (async 추가)
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault(); // 기본 폼 제출 동작 방지
    setIsLoading(true); // 로딩 상태 활성화
    setError(''); // 에러 메시지 초기화

    if (password !== confirmPassword) {
      setError('Passwords do not match.'); // 비밀번호 불일치 메시지
      setIsLoading(false); // 로딩 상태 비활성화
      return;
    }

    try {
      await AuthService.tryRegister(email, password); // AuthService 회원가입 메서드 호출
      console.log('Registration successful:', email); // 회원가입 성공 로그
      navigate('/signin'); // 회원가입 성공 시 로그인 페이지로 이동
    } catch (err) {
      setError('Registration failed: Email already exists.'); // 회원가입 실패 메시지
    } finally {
      setIsLoading(false); // 로딩 상태 비활성화
    }
  };

  return (
    <div>
      <div className="container">
        <div className="bg-image">
            <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
        </div>
        <div className="card">
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
              <label></label>
            </div>
            <div className="input">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label></label>
            </div>
            <div className="input">
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label></label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <label htmlFor="terms">
                I agree to the <b>Terms and Conditions</b>
              </label>
            </div>
            <button
              type="submit"
              disabled={!email || !password || !confirmPassword || !acceptTerms || isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* 에러 메시지 */}
          </form>
          <div className="account-check">
            Already have an account? <b onClick={() => navigate('/signin')}>Sign in</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
