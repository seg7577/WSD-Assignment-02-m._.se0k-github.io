# Netflix Clone (WSD-Assignment-02)
---
## FrameWork
React

TMDB

TypeScript

gh-pages
---
## branch
master: 제품 출시 버전을 관리하는 메인 브랜치


develop: 다음 출시 버전을 위해 개발하는 브랜치


feature: 새로운 기능을 개발하는 브랜치


hotfix: 출시된 제품의 버그를 고치기 위한 브랜치
---
<<<<<<< HEAD
## `npm`
=======
## npm
>>>>>>> develop

### `npm start`
애플리케이션을 개발 모드로 실행합니다.
브라우저에서 http://localhost:3000을 열어 확인할 수 있습니다.
수정 사항을 저장하면 페이지가 자동으로 새로고침됩니다.
또한, 콘솔에서 Lint 오류를 확인할 수 있습니다.
### `npm test`

테스트 러너(Test Runner)를 인터랙티브 워치 모드(Interactive Watch Mode)로 실행합니다.
테스트 실행에 대한 더 자세한 내용은 Running Tests 섹션을 참고하세요.

### `npm run build`

애플리케이션을 프로덕션 환경용으로 build 폴더에 빌드합니다.
React를 프로덕션 모드로 올바르게 번들링하고 최상의 성능을 위해 빌드를 최적화합니다.
빌드된 파일은 압축되며, 파일 이름에 해시 값이 포함됩니다.
이제 애플리케이션을 배포할 준비가 완료되었습니다!
배포에 대한 자세한 내용은 배포 섹션을 참고하세요.

### `npm run eject`

참고: 이 작업은 되돌릴 수 없는 단방향 작업입니다. eject를 실행하면 다시 되돌릴 수 없습니다!
빌드 도구와 설정 선택이 만족스럽지 않다면, 언제든지 eject를 실행할 수 있습니다. 이 명령은 프로젝트에서 단일 빌드 의존성을 제거합니다.
대신, 모든 설정 파일과 종속 의존성(webpack, Babel, ESLint 등)을 프로젝트 내부로 복사하여 완전한 제어권을 제공합니다. eject를 제외한 모든 명령은 여전히 작동하지만, 이제 복사된 스크립트를 참조하므로 이를 수정할 수 있습니다. 이 단계부터는 사용자가 모든 것을 직접 관리해야 합니다.
eject를 반드시 사용할 필요는 없습니다. 기본 제공되는 기능들은 소규모 및 중간 규모 배포에 적합하며, 이 기능을 반드시 사용해야 한다고 느낄 필요는 없습니다. 하지만, 설정을 직접 수정할 준비가 되었을 때 이 도구를 맞춤화할 수 있어야 유용하다는 점을 이해하고 있습니다.

### `npm run deploy`

    git add .
    git commit -m "메시지"
    git push origin main
    npm run deploy
빌드한 정적 파일을 github pages에 업로드하고 배포합니다. 실행 과정에 npm run build가 호출됩니다.
