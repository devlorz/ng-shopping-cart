import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, selectCartEntities, selectAllCartItems } from './cart.reducer';
import * as productSelector from '../../product/store/product.selector';

export const getCartState = createFeatureSelector<State>('cart');

export const getCarts = createSelector(getCartState, selectCartEntities);

export const getAllCartItems = createSelector(getCartState, selectAllCartItems);

export const getCartsWithDetail = createSelector(
  getAllCartItems,
  productSelector.getAllProducts,
  (cartItems, products) =>
    cartItems.map(cartItem => {
      const productDetail = products.find(
        product => product.id === cartItem.productId
      );
      return {
        ...cartItem,
        ...productDetail,
        total: cartItem.quantity * productDetail.price
      };
    })
);

export const getLoadingStatus = createSelector(
  getCartState,
  state => state.isloading
);
