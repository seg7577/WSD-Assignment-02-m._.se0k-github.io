# [M_SE0K-MOVIE](https://seg7577.github.io/WSD-Assignment-02-m._.se0k-github.io/)
---
## 프로젝트 기술 스택
React


FontAwesome


TMDB API
---
## branch
master: 제품 출시 버전을 관리하는 메인 브랜치


develop: 다음 출시 버전을 위해 개발하는 브랜치


feature/브랜치: 새로운 기능을 개발하는 브랜치
---
## 프로젝트 구조
```
WAS-ASSiGNMENT-02/
├── public/
    ├── favicon.ico         
    ├── index.html          
    ├── manifest.json        
    ├── robots.txt          

    src/
    ├── App/
    │   ├── components/    
    │   │   ├── home/       
    │   │   │   ├── main/
    │   │   │   │   ├── HomeMain.css
    │   │   │   │   ├── HomeMain.tsx
    │   │   │   ├── popular/
    │   │   │   │   ├── HomePopular.css
    │   │   │   │   ├── HomePopular.tsx
    │   │   │   ├── search/
    │   │   │   │   ├── HomeSearch.css
    │   │   │   │   ├── HomeSearch.tsx
    │   │   │   ├── wishlist/
    │   │   │   │   ├── HomeWishlist.css
    │   │   │   │   ├── HomeWishlist.tsx
    │   │   │   ├── Home.css
    │   │   │   ├── Home.tsx
    │   │   ├── layout/     
    │   │   │   ├── toast/
    │   │   │   │   ├── Toast.css
    │   │   │   │   ├── Toast.tsx
    │   │   │   │   ├── ToastContext.tsx
    │   │   │   ├── Header.css
    │   │   │   ├── Header.tsx
    │   │   ├── movie/      
    │   │   │   ├── banner/
    │   │   │   │   ├── Banner.css
    │   │   │   │   ├── Banner.tsx
    │   │   │   ├── local-movie-infinitescroll/
    │   │   │   │   ├── LocalMovieInfiniteScroll.css
    │   │   │   │   ├── LocalMovieInfiniteScroll.tsx
    │   │   │   ├── movie-card/
    │   │   │   │   ├── MovieCard.tsx
    │   │   │   ├── movie-grid/
    │   │   │   │   ├── MovieGrid.css
    │   │   │   │   ├── MovieGrid.tsx
    │   │   │   ├── movie-infinite-scroll/
    │   │   │   │   ├── MovieInfiniteScroll.css
    │   │   │   │   ├── MovieInfiniteScroll.tsx
    │   │   │   ├── movie-row/
    │   │   │   │   ├── MovieRow.css
    │   │   │   │   ├── MovieRow.tsx
    │   │   │   ├── movie-search/
    │   │   │   │   ├── MovieSearch.css
    │   │   │   │   ├── MovieSearch.tsx
    │   │   │   ├── movie-wishlist/
    │   │   │   │   ├── MovieWishlist.css
    │   │   │   │   ├── MovieWishlist.tsx
    │   │   ├── sign-in/    
    │   │   │   ├── SignIn.css
    │   │   │   ├── SignIn.tsx
    │   ├── context/        
    │   │   ├── AuthContext.tsx
    │   │   ├── WishContext.tsx
    │   │   ├── WishListContext.tsx
    │   ├── hooks/          
    │   │   ├── useAuthGuard.ts
    │   ├── util/           
    │   │   ├── auth/
    │   │   │   ├── authApiService.tsx
    │   │   │   ├── AuthGuard.tsx
    │   │   │   ├── authService.tsx
    │   │   │   ├── authUtil.tsx
    │   │   │   ├── config.tsx
    │   │   ├── routes/
    │   │   │   ├── AppRoutes.tsx
    │   │   ├── services/
    │   │   │   ├── URLService.tsx
    │   ├── App.test.tsx    
    │   ├── App.tsx         
    │   ├── privateRoute.tsx 
    ├── logo.svg             
    ├── react-app-env.d.ts   
    ├── reportWebVitals.ts   
    ├── setupTests.ts        
    index.css
    index.html
    index.tsx
```
---
## `npm`

### 프로젝트 설치 설정
`npm install`

### 개발 서버 실행 및 핫 리로드
`npm start`
애플리케이션을 개발 모드로 실행합니다.
브라우저에서 http://localhost:3000/WSD-Assignment-02-m._.se0k-github.io/을 열어 확인할 수 있습니다.
수정 사항을 저장하면 페이지가 자동으로 새로고침됩니다.

### 프로덕션 빌드
`npm run build`

