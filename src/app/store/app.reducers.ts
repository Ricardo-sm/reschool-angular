import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';

export interface AppState {
  theme: reducers.ThemeState;
}

export const appReducers: ActionReducerMap<AppState> = {
  theme: reducers.themeReducer,
};
