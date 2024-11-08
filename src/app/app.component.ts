import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignInComponent],
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-demo';
}
//AppComponent는 애플리케이션의 루트 컴포넌트입니다. RouterOutlet을 사용하여 라우팅된 컴포넌트가 렌더링될 위치를 지정하며, title 속성을 통해 컴포넌트의 제목을 정의합니다.