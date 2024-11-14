// import React, { useState } from 'react'; // React 라이브러리와 상태 관리를 위한 useState 훅을 가져옵니다.
// import './SignIn.css'; // SignIn 컴포넌트에 적용할 CSS 파일을 가져옵니다.
// import '../sign-up/SignUp'

// const SignIn = () => {                                         // SignIn 컴포넌트 정의
//   // 컴포넌트 상태 정의 (React의 useState 훅 사용)
//   const [isLoginVisible, setIsLoginVisible] = useState(true); // 현재 화면에 보이는 카드가 로그인 화면인지 회원가입 화면인지 저장
//   const [email, setEmail] = useState('');                     // 로그인 화면에서 이메일 입력값 상태
//   const [password, setPassword] = useState('');               // 로그인 화면에서 비밀번호 입력값 상태
//   const [registerEmail, setRegisterEmail] = useState('');     // 회원가입 화면에서 이메일 입력값 상태
//   const [registerPassword, setRegisterPassword] = useState('');// 회원가입 화면에서 비밀번호 입력값 상태
//   const [confirmPassword, setConfirmPassword] = useState(''); // 회원가입 화면에서 비밀번호 확인 입력값 상태
//   const [rememberMe, setRememberMe] = useState(false);        // 로그인 화면에서 "Remember me" 체크박스 상태
//   const [acceptTerms, setAcceptTerms] = useState(false);      // 회원가입 화면에서 "Terms and Conditions" 체크박스 상태

//   // 로그인 화면과 회원가입 화면을 전환하는 함수
//   const toggleCard = () => setIsLoginVisible(!isLoginVisible); // 현재 화면 상태를 반전시켜 로그인 ↔ 회원가입 화면 전환

//   // 로그인 폼 제출 처리 함수
//   const handleLogin = (event: React.FormEvent) => {
//     event.preventDefault(); // 기본 폼 제출 동작(페이지 새로고침)을 막음
//     console.log('Login:', { email, password, rememberMe }); // 입력된 이메일, 비밀번호, "Remember me" 상태를 콘솔에 출력
//   };

//   // 회원가입 폼 제출 처리 함수
//   const handleRegister = (event: React.FormEvent) => {
//     event.preventDefault(); // 기본 폼 제출 동작(페이지 새로고침)을 막음
//     console.log('Register:', { registerEmail, registerPassword, confirmPassword, acceptTerms }); // 입력된 회원가입 정보와 체크박스 상태를 콘솔에 출력
//   };

//   return (
//     <div> {/* 전체 컴포넌트를 감싸는 최상위 div */}
//       <div className="bg-image"></div> {/* 배경 이미지를 추가하는 div */}
//       <div className="container"> {/* 중앙 정렬 및 스타일링된 컨테이너 */}
//         <div id="phone"> {/* 디자인 목적의 ID, 전체 컴포넌트에 스타일링 역할 */}
//           <div id="content-wrapper"> {/* 카드 컨텐츠를 감싸는 래퍼 div */}

//             {/* 로그인 카드 */}
//             <div className={`card ${!isLoginVisible ? 'hidden' : ''}`} id="login"> {/* isLoginVisible 상태에 따라 'hidden' 클래스 추가 */}
//               <form onSubmit={handleLogin}> {/* 로그인 폼, 제출 시 handleLogin 함수 호출 */}
//                 <h1>Sign in</h1> {/* 로그인 화면의 제목 */}
//                 <div className="input">
//                   {/* 이메일 입력 필드 */}
//                   <input
//                     id="email"
//                     type="email" // 입력값을 이메일 형식으로 제한
//                     value={email} // 상태 값(email)을 입력 필드의 값으로 설정
//                     onChange={(e) => setEmail(e.target.value)} // 입력값 변경 시 email 상태 업데이트
//                   />
//                   <label htmlFor="email">Username or Email</label> {/* 이메일 입력 필드의 라벨 */}
//                 </div>
//                 <div className="input">
//                   {/* 비밀번호 입력 필드 */}
//                   <input
//                     id="password"
//                     type="password" // 입력값을 비밀번호 형식으로 설정
//                     value={password} // 상태 값(password)을 입력 필드의 값으로 설정
//                     onChange={(e) => setPassword(e.target.value)} // 입력값 변경 시 password 상태 업데이트
//                   />
//                   <label htmlFor="password">Password</label> {/* 비밀번호 입력 필드의 라벨 */}
//                 </div>
//                 <span className="checkbox remember">
//                   {/* "Remember me" 체크박스 */}
//                   <input
//                     type="checkbox"
//                     id="remember"
//                     checked={rememberMe} // 체크박스 상태를 rememberMe 상태와 연동
//                     onChange={(e) => setRememberMe(e.target.checked)} // 체크박스 상태 변경 시 rememberMe 상태 업데이트
//                   />
//                   <label htmlFor="remember" className="read-text">Remember me</label> {/* 체크박스 라벨 */}
//                 </span>
//                 <span className="checkbox forgot">
//                   <a href="#">Forgot Password?</a> {/* 비밀번호 찾기 링크 */}
//                 </span>
//                 <button disabled={!email || !password}>Login</button> {/* 이메일과 비밀번호가 입력되지 않으면 버튼 비활성화 */}
//               </form>
//               <a href="signup" className="account-check" onClick={toggleCard}>
//                 Don't have an account? <b>Sign up</b> {/* 회원가입 화면으로 전환 */}
//               </a>
//             </div>

//             {/* 회원가입 카드 */}
//             <div className={`card ${isLoginVisible ? 'hidden' : ''}`} id="register"> {/* isLoginVisible 상태에 따라 'hidden' 클래스 추가 */}
//               <form onSubmit={handleRegister}> {/* 회원가입 폼, 제출 시 handleRegister 함수 호출 */}
//                 <h1>Sign up</h1> {/* 회원가입 화면의 제목 */}
//                 <div className="input">
//                   {/* 회원가입 이메일 입력 필드 */}
//                   <input
//                     id="register-email"
//                     type="email" // 입력값을 이메일 형식으로 제한
//                     value={registerEmail} // 상태 값(registerEmail)을 입력 필드의 값으로 설정
//                     onChange={(e) => setRegisterEmail(e.target.value)} // 입력값 변경 시 registerEmail 상태 업데이트
//                   />
//                   <label htmlFor="register-email">Email</label> {/* 회원가입 이메일 입력 필드의 라벨 */}
//                 </div>
//                 <div className="input">
//                   {/* 회원가입 비밀번호 입력 필드 */}
//                   <input
//                     id="register-password"
//                     type="password" // 입력값을 비밀번호 형식으로 설정
//                     value={registerPassword} // 상태 값(registerPassword)을 입력 필드의 값으로 설정
//                     onChange={(e) => setRegisterPassword(e.target.value)} // 입력값 변경 시 registerPassword 상태 업데이트
//                   />
//                   <label htmlFor="register-password">Password</label> {/* 회원가입 비밀번호 입력 필드의 라벨 */}
//                 </div>
//                 <div className="input">
//                   {/* 회원가입 비밀번호 확인 필드 */}
//                   <input
//                     id="confirm-password"
//                     type="password" // 입력값을 비밀번호 형식으로 설정
//                     value={confirmPassword} // 상태 값(confirmPassword)을 입력 필드의 값으로 설정
//                     onChange={(e) => setConfirmPassword(e.target.value)} // 입력값 변경 시 confirmPassword 상태 업데이트
//                   />
//                   <label htmlFor="confirm-password">Confirm Password</label> {/* 회원가입 비밀번호 확인 필드의 라벨 */}
//                 </div>
//                 <span className="checkbox remember">
//                   {/* "Terms and Conditions" 체크박스 */}
//                   <input
//                     type="checkbox"
//                     id="terms"
//                     checked={acceptTerms} // 체크박스 상태를 acceptTerms 상태와 연동
//                     onChange={(e) => setAcceptTerms(e.target.checked)} // 체크박스 상태 변경 시 acceptTerms 상태 업데이트
//                   />
//                   <label htmlFor="terms" className="read-text">I have read <b>Terms and Conditions</b></label> {/* 체크박스 라벨 */}
//                 </span>
//                 <button disabled={!registerEmail || !registerPassword || !acceptTerms}>Register</button> {/* 입력값이 모두 유효하지 않으면 버튼 비활성화 */}
//               </form>
//               <a href="#" className="account-check" onClick={toggleCard}>
//                 Already have an account? <b>Sign in</b> {/* 로그인 화면으로 전환 */}
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn; // SignIn 컴포넌트를 외부에서 사용할 수 있도록 내보냅니다.
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 가져오기
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate(); // 페이지 전환을 위한 useNavigate 훅
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // 로그인 폼 제출 처리
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Login:', { email, password, rememberMe });
  };

  // 회원가입 버튼 클릭 시 SignUp 컴포넌트로 이동
  const goToSignUp = () => {
    navigate('/signup'); // '/signup' 경로로 이동
  };

  return (
    <div>
      <div className="bg-image"></div>
      <div className="container">
        <div id="phone">
          <div id="content-wrapper">
            <div className="card" id="login">
              <form onSubmit={handleLogin}>
                <h1>Sign in</h1>
                <div className="input">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="email">Username or Email</label>
                </div>
                <div className="input">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <span className="checkbox remember">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember">Remember me</label>
                </span>
                <button disabled={!email || !password}>Login</button>
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
