import { Action } from '@ngrx/store';

import { Product } from './../../product/product.model';
import { CartItem } from './../cart.model';
import { Order } from '../../order/order.model';
import { Dictionary } from '@ngrx/entity';

export enum CartActionTypes {
  AddItem = '[Cart] Add Item',
  AdjustQuantity = '[Cart] Adjust Quantity',
  RemoveItem = '[Cart] Remove Item',
  ConfirmOrder = '[Cart] Confirm Order',
  ConfirmOrderSuccess = '[Cart] Confirm Order Success',
  ConfirmOrderFail = '[Cart] Confirm Order Fail',
  UpdateCartSuccess = '[Cart] Update Cart Success',
  UpdateCartFail = '[Cart] Update Cart Fail',
  GetCartItemSuccess = '[Cart] Get Cart Item Success',
  GetCartItemFail = '[Cart] Get Cart Item Fail',
  ResetCart = '[Cart] Reset Cart',
  ResetErrorMessage = '[Cart] Reset Error Message'
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

  constructor(public payload: any) {}
}

export class UpdateCartSuccess implements Action {
  readonly type = CartActionTypes.UpdateCartSuccess;
}

export class UpdateCartFail implements Action {
  readonly type = CartActionTypes.UpdateCartFail;

  constructor(public payload: any) {}
}

export class GetCartItemSuccess implements Action {
  readonly type = CartActionTypes.GetCartItemSuccess;

  constructor(public payload: { carts: CartItem[] }) {}
}

export class GetCartItemFail implements Action {
  readonly type = CartActionTypes.GetCartItemFail;

  constructor(public payload: any) {}
}

export class ResetCart implements Action {
  readonly type = CartActionTypes.ResetCart;
}

export class ResetErrorMessage implements Action {
  readonly type = CartActionTypes.ResetErrorMessage;
}

export type CartActions =
  | AddItem
  | AdjustQuantity
  | RemoveItem
  | ConfirmOrder
  | ConfirmOrderSuccess
  | ConfirmOrderFail
  | UpdateCartSuccess
  | UpdateCartFail
  | GetCartItemSuccess
  | GetCartItemFail
  | ResetCart
  | ResetErrorMessage;
