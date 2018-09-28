import { Action } from '@ngrx/store';

import { Product } from './../../product/product.model';
import { CartItem } from './../cart.model';
import { Order } from '../order.model';

export enum CartActionTypes {
  AddItem = '[Cart] Add Item',
  AdjustQuantity = '[Cart] Adjust Quantity',
  RemoveItem = '[Cart] Remove Item',
  ConfirmOrder = '[Cart] Confirm Order',
  ConfirmOrderSuccess = '[Cart] Confirm Order Success',
  ConfirmOrderFail = '[Cart] Confirm Order Fail'
}

export class AddItem implements Action {
  readonly type = CartActionTypes.AddItem;

  constructor(public payload: CartItem) {}
}

export class AdjustQuantity implements Action {
  readonly type = CartActionTypes.AdjustQuantity;

  constructor(public payload: { id: number; quantity: number }) {}
}

export class RemoveItem implements Action {
  readonly type = CartActionTypes.RemoveItem;

  constructor(public payload: number) {}
}

export class ConfirmOrder implements Action {
  readonly type = CartActionTypes.ConfirmOrder;

  constructor(public payload: Order) {}
}

export class ConfirmOrderSuccess implements Action {
  readonly type = CartActionTypes.ConfirmOrderSuccess;
}

export class ConfirmOrderFail implements Action {
  readonly type = CartActionTypes.ConfirmOrderFail;
}

export type CartActions =
  | AddItem
  | AdjustQuantity
  | RemoveItem
  | ConfirmOrder
  | ConfirmOrderSuccess
  | ConfirmOrderFail;
