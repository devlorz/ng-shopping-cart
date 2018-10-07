import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './auth.reducer';

export const getAuthState = createFeatureSelector<State>('auth');

export const getLoggedInStatus = createSelector(
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
