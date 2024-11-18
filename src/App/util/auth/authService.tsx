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
              console.log('authService.tsx 호출 성공')
              resolve(user);
               // 로그인 성공 시 해당 사용자 데이터를 resolve
          } else { 
              console.log('authService.tsx 호출 실패')
              reject('Login failed');
              // 로그인 실패 시 에러 메시지를 reject
          }
      });
  },

  // 회원가입 시도 메서드 정의
  tryRegister: (email: string, password: string): Promise<void> => {
    /*
    주요 역할
    1. 이미 등록된 사용자(중복 이메일)이 있는 지 확인
    2. 중복이 없으면 새로운 사용자 추가
    3. 로컬 스토리지에 사용자 데이터를 저장하여 회원가입 완료.

    resolve() : 비동기 작업이 성공적으로 완료되었다는 것을 알리는 bool 형식. 호출한 함수에서는.than() 메서드를 통해 결과를 처리할 수 있음.
    reject() : 비동기 작업이 실패했다는 것을 아리는 bool 형식. reject(error)와 같이 호춣하며, error는 실패에 대한 에러 정보를 담는다. 호출한 함수에서는 .catch() 메서드를 통해 에러를 처리할 수 있음.
    */
      
      return new Promise((resolve, reject) => {
        // Promise를 반환하여 비동기 작업 처리, resolve()가 호출되면 성공, reject()가 호출되면 실패
          try {
              const users = JSON.parse(localStorage.getItem('users') || '[]');
              // 기존 사용자 목록 로드 : 로컬 스토리지에서 'users' 데이터를 가져오고 JSON 파싱. 데이터가 없으면 빈 배열로 초기화
              const userExists = users.some((user: any) => user.id === email);
              // 가져온 사용자 데이터 중 이메일이 동일한 사용자가 이미 존재하는지 확인(some() 메서드 사용) => true가 반환된 경우 존재하는 이메일임.

              if (userExists) { 
                // 동일한 이메일의 사용자가 이미 존재할 경우 에러를 reject하여 회원가입 실패 알림
                  reject(new Error('User already exists'));
                  return;
              }

              const newUser = { id: email, password };
              // 새로운 사용자 객체 생성
              users.push(newUser);
              // 기존 사용자 목록에 새 사용자를 추가
              localStorage.setItem('users', JSON.stringify(users));
              // 업데이트된 사용자 데이터를 로컬 스토리지에 저장
              resolve();
               // 성공적으로 회원가입 완료 시 resolve 호출
          } catch (err) { 
              // 예외 발생 시 reject로 에러 전달
              reject(err);
          }
      });
  },
};

//"const users = JSON.parse(localStorage.getItem('users') || '[]');" 이 부분에서 JSon.parse는 어떤 거야?


