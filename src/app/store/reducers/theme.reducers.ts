import { Action, createReducer, on } from '@ngrx/store';
import { turnOffDarkMode, turnOnDarkMode } from '../actions';

export interface ThemeState {
  darkMode: boolean;
}

const initialState: ThemeState = {
  darkMode: null,
};

const _themeReducer = createReducer(
  initialState,
  on(turnOnDarkMode, (state: ThemeState) => ({ ...state, darkMode: true })),
  on(turnOffDarkMode, (state: ThemeState) => ({ ...state, darkMode: false }))
);

export function themeReducer(state: ThemeState | undefined, action: Action) {
  return _themeReducer(state, action);
}
