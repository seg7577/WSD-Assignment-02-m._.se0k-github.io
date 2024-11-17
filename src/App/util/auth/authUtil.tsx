// authUtils.ts: 인증 관련 유틸리티 함수
export const isAuthenticated = (): boolean => {
    // 로컬스토리지 또는 세션스토리지에서 사용자 정보 확인
    const user =
      JSON.parse(localStorage.getItem('user') || 'null') ||
      JSON.parse(sessionStorage.getItem('user') || 'null');
  
    // 사용자 정보가 존재하고, 토큰이 유효하면 true 반환
    return user && user.token ? true : false;
  };
  