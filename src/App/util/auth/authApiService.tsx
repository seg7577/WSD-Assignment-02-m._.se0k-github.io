/*
현재 로그인한 사용자의 API키를 사용하기 위한 로직 및 2차 검증 로직
*/

interface User {
    id: string; // 사용자 이메일 또는 ID
    password: string; // 사용자 비밀번호 또는 API 키
}
  
  const users: User[] = JSON.parse(localStorage.getItem('users') || '[]'); // 타입 지정된 사용자 배열
  
  // 현재 로그인된 사용자 ID 가져오기
  const currentUserId = localStorage.getItem('currentUser'); // 현재 로그인된 사용자 ID 저장용 키
  
  // 현재 사용자와 일치하는 데이터 찾기
  const currentUser = users.find((user) => user.id === currentUserId);
  
  // 사용자 인증 정보 기반 구성
  const config = {
    apiBaseUrl: 'https://api.themoviedb.org/3', // TMDB API 기본 URL
    apiKey: currentUser ? currentUser.password : '', // 현재 사용자의 API 키 설정, 사용자 정보가 없으면 빈 문자열
    enableAnimations: true, // 애니메이션 활성화 여부
  };
  
  export default config;
  