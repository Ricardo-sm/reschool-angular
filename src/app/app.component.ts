import { Component, HostBinding, OnInit } from '@angular/core';
import { ThemeService } from './themes/theme.service';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @HostBinding('class') public cssClass: string;
  title = 'reschool-frontend';

  constructor(private themeService: ThemeService) {
    this.cssClass = '';
  }

  ngOnInit(): void {
    this.themeService.theme.subscribe(({ darkMode }) => {
      this.cssClass = darkMode ? 'dark-theme' : 'light-theme';
    });
  }
}
