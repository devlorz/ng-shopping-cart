import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './order.reducer';

export const getOrderState = createFeatureSelector<State>('order');

export const getAllOrders = createSelector(
  getOrderState,
  state => state.orders
);

export const getLoadingStatus = createSelector(
  getOrderState,
  state => state.isLoading
);
