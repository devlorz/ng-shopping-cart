import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './product.reducer';

export const getProductState = createFeatureSelector<State>('product');

export const getAllProducts = createSelector(
  getProductState,
  state => state.products
);
