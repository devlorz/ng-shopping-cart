import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './../../app.reducer';
import { State } from './auth.reducer';

// export const getAuthState = (state: AppState) => state.auth;
export const getAuthState = createFeatureSelector<State>('auth');

export const getLoggedIn = createSelector(
  getAuthState,
  state => state.loggedIn
);

export const getUser = createSelector(
  getAuthState,
  (state: State) => state.user
);

export const getLoadingStatus = createSelector(
  getAuthState,
  (state: State) => state.isLoading
);
