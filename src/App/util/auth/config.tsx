// 로컬 스토리지에서 사용자 정보 가져오기
const users = JSON.parse(localStorage.getItem('users') || '[]');
const currentUserId = localStorage.getItem('currentUser'); // 현재 사용자 ID 가져오기
const currentUser = users.find((user: { id: string }) => user.id === currentUserId);

// TMDB API 기본 설정
const config = {
  apiBaseUrl: 'https://api.themoviedb.org/3',
  apiKey: currentUser ? currentUser.password : '', // 현재 사용자의 API 키
  enableAnimations: true, // 애니메이션 활성화 여부
};

export default config;
