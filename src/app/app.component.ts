import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { trigger, transition, style, animate, group, query } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignInComponent],
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%',
            transform: 'rotateY(90deg)',
            backfaceVisibility: 'hidden',
            opacity: 0,
          })
        ], { optional: true }),
        group([
          query(':leave', [
            animate('0.5s ease-out', style({ transform: 'rotateY(90deg)', opacity: 0 }))
          ], { optional: true }),
          query(':enter', [
            style({ transform: 'rotateY(-90deg)' }),
            animate('0.5s ease-out', style({ transform: 'rotateY(0)', opacity: 1 }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class AppComponent {
  title = 'Angular-demo';
}
//AppComponent는 애플리케이션의 루트 컴포넌트입니다. RouterOutlet을 사용하여 라우팅된 컴포넌트가 렌더링될 위치를 지정하며, title 속성을 통해 컴포넌트의 제목을 정의합니다.