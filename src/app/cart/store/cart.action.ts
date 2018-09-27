import { Action } from '@ngrx/store';

import { CartItem } from './../cart.model';

export enum CartActionTypes {
  ADD_ITEM = '[Cart] Add Item',
  ADJUST_QUANTITY = '[Cart] Adjust Quantity',
  REMOVE_ITEM = '[Cart] Remove Item'
}

export class AddItem implements Action {
  readonly type = CartActionTypes.ADD_ITEM;

  constructor(public payload: CartItem) {}
}

export class AdjustQuantity implements Action {
  readonly type = CartActionTypes.ADJUST_QUANTITY;

  constructor(public payload: { id: number; quantity: number }) {}
}

export class RemoveItem implements Action {
  readonly type = CartActionTypes.REMOVE_ITEM;

  constructor(public payload: number) {}
}

export type CartActions = AddItem | AdjustQuantity | RemoveItem;
