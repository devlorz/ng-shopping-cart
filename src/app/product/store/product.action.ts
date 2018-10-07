import { Action } from '@ngrx/store';

import { Product } from '../product.model';

export enum ProductActionTypes {
  GetProducts = '[Product] Get Products',
  GetProductsSuccess = '[Product] Get Products Success',
  GetProductsFail = '[Product] Get Products Fail'
}

export class GetProducts implements Action {
  readonly type = ProductActionTypes.GetProducts;
}

export class GetProductsSuccess implements Action {
  readonly type = ProductActionTypes.GetProductsSuccess;

  constructor(public payload: Array<Product>) {}
}

export class GetProductsFail implements Action {
  readonly type = ProductActionTypes.GetProductsFail;

  constructor(public payload: any) {}
}

export type ProductActions = GetProducts | GetProductsSuccess | GetProductsFail;
