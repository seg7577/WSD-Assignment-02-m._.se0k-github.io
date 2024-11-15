export const AuthService = { // AuthService 객체를 export하여 다른 파일에서 사용할 수 있도록 함.
  tryLogin: (email: string, password: string, saveToken = true): Promise<any> => {
  // 로그인 시도 메서드 정의
      return new Promise((resolve, reject) => {
        // Promise를 반환하여 비동기 작업 처리
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          // 로컬 스토리지에서 'users' 데이터를 가져오고 JSON 파싱. 데이터가 없으면 빈 배열로 초기화
          const user = users.find((user: any) => user.id === email && user.password === password);
          // 가져온 사용자 데이터 중 이메일과 비밀번호가 일치하는 사용자를 찾음
          if (user) { // 사용자가 존재하면
              if (saveToken) { // saveToken이 true일 경우
                  localStorage.setItem('TMDb-Key', user.password);
                  // 사용자의 비밀번호를 'TMDb-Key' 키로 로컬 스토리지에 저장 (토큰 저장으로 가정)
                  /* 동작설명
                   localStorage.setItem('TMDb-Key', user.password);는 단순히 사용자의 비밀번호를 로컬 스토리지에 저장하고, 해당 값에 접근할 때 'TMDb-Key'라는 키를 사용한다는 것을 의미합니다.
                    여기서 TMDb-Key라는 변수명은 실제 TMDB API 키와는 관련이 없고, 단지 비밀번호를 저장하기 위해 임의로 사용된 키 이름입니다
                  */
              }
              resolve(user);
               // 로그인 성공 시 해당 사용자 데이터를 resolve
          } else { 
              reject('Login failed');
              // 로그인 실패 시 에러 메시지를 reject
          }
      });
  },

  // 회원가입 시도 메서드 정의
  tryRegister: (email: string, password: string): Promise<void> => {
      // Promise를 반환하여 비동기 작업 처리
      return new Promise((resolve, reject) => {
          try {
              // 로컬 스토리지에서 'users' 데이터를 가져오고 JSON 파싱. 데이터가 없으면 빈 배열로 초기화
              const users = JSON.parse(localStorage.getItem('users') || '[]');
              // 가져온 사용자 데이터 중 이메일이 동일한 사용자가 이미 존재하는지 확인
              const userExists = users.some((existingUser: any) => existingUser.id === email);

              if (userExists) { 
                // 동일한 이메일의 사용자가 이미 존재할 경우 에러를 reject하여 회원가입 실패 알림
                  reject(new Error('User already exists'));
                  return;
              }

              // 새로운 사용자 객체 생성
              const newUser = { id: email, password };
              // 사용자 목록에 새 사용자를 추가
              users.push(newUser);
              // 업데이트된 사용자 데이터를 로컬 스토리지에 저장
              localStorage.setItem('users', JSON.stringify(users));
              // 성공적으로 회원가입 완료 시 resolve 호출
              resolve();
          } catch (err) { 
              // 예외 발생 시 reject로 에러 전달
              reject(err);
          }
      });
  },
};
