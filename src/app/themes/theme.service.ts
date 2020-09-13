import { Injectable, ApplicationRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';

import * as themeActions from '../store/actions/theme.actions';
import { Observable } from 'rxjs';
import { ThemeState } from '../store/reducers';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themeStorage: ThemeState | null;
  theme: Observable<ThemeState>;

  constructor(private ref: ApplicationRef, private store: Store<AppState>) {
    this.themeStorage = JSON.parse(localStorage?.getItem('theme'));
    this.theme = this.store.select('theme').pipe();

    if (this.themeStorage.darkMode === null) {
      const darkModeOn: boolean =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

      darkModeOn
        ? this.store.dispatch(themeActions.turnOnDarkMode())
        : this.store.dispatch(themeActions.turnOffDarkMode());
    } else {
      this.themeStorage.darkMode
        ? this.store.dispatch(themeActions.turnOnDarkMode())
        : this.store.dispatch(themeActions.turnOffDarkMode());
    }
  }
}
