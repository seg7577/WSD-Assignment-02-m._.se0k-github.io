import { Component, OnInit, OnDestroy } from '@angular/core';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import {URLService} from '../../../util/movie/URL';
import {BannerComponent} from '../../../views/home-main/banner.component';
import {MovieRowComponent} from '../../../views/home-main/movie-row.component';
import { trigger, transition, style, animate, keyframes} from '@angular/animations';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css'],
  standalone: true,
  imports: [
    BannerComponent,
    MovieRowComponent
  ],
  animations: [
    trigger('fancyEnter', [
      transition(':enter', [
        animate(
          '1.5s ease-in-out',
          keyframes([
            style({ opacity: 0, transform: 'scale(0.8)', offset: 0 }),
            style({ opacity: 0.5, transform: 'scale(1.1)', offset: 0.7 }),
            style({ opacity: 1, transform: 'scale(1)', offset: 1 })
          ])
        )
      ])
    ]),
    trigger('rowHover', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate('0.7s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})

export class HomeMainComponent implements OnInit, OnDestroy {
  faSearch = faSearch;
  faUser = faUser;

  apiKey: string = localStorage.getItem('TMDb-Key') || '';
  featuredMovie: any = null;
  popularMoviesUrl: string = '';
  newReleasesUrl: string = '';
  actionMoviesUrl: string = '';

  private scrollListener: any;

  constructor(
    private urlService: URLService
  ) {
    this.popularMoviesUrl = urlService.getURL4PopularMovies(this.apiKey);
    this.newReleasesUrl = urlService.getURL4ReleaseMovies(this.apiKey);
    this.actionMoviesUrl = urlService.getURL4GenreMovies(this.apiKey, '28');
  }

  ngOnInit() {
    this.loadFeaturedMovie();
    this.initializeScrollListener();
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  private async loadFeaturedMovie() {
    this.featuredMovie = await this.urlService.fetchFeaturedMovie(this.apiKey);
  }

  private initializeScrollListener() {
    this.scrollListener = () => {
      const header = document.querySelector('.app-header');
      if (window.scrollY > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', this.scrollListener);
  }
}
