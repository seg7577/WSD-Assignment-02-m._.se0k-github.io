import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
//애플리케이션의 설정을 관리하는 파일입니다. provideZoneChangeDetection과 provideRouter를 사용하여 라우터 설정과 성능 최적화를 구성합니다.