import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, selectCartEntities } from './cart.reducer';

export const getCartState = createFeatureSelector<State>('cart');

export const selectCarts = createSelector(getCartState, selectCartEntities);
