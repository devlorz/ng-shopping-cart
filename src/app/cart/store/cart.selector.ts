import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as productSelector from '../../product/store/product.selector';
import { selectAllCartItems, selectCartEntities, State } from './cart.reducer';

export const getCartState = createFeatureSelector<State>('cart');

export const getCarts = createSelector(getCartState, selectCartEntities);

export const getAllCartItems = createSelector(getCartState, selectAllCartItems);

export const getCartsWithDetail = createSelector(
  getAllCartItems,
  productSelector.getAllProducts,
  (cartItems, products) => {
    if (products.length > 0) {
      return cartItems.map(cartItem => {
        const productDetail = products.find(
          product => product.id === cartItem.productId
        );
        return {
          ...cartItem,
          ...productDetail,
          total: cartItem.quantity * productDetail.price
        };
      });
    } else {
      return [];
    }
  }
);

export const getLoadingStatus = createSelector(
  getCartState,
  state => state.isloading
);

export const getErrorMessage = createSelector(
  getCartState,
  state => state.errorMessage
);
