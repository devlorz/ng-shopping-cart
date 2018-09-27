import { Action } from '@ngrx/store';
import { Product } from '../product.model';

export const ProductActionTypes = {
  SET_ALL_PRODUCTS: '[Product] Set All Products'
};

export class SetAllProducts implements Action {
  readonly type = ProductActionTypes.SET_ALL_PRODUCTS;

  constructor(public payload: Array<Product>) {}
}

export type ProductActions = SetAllProducts;
