import { Action } from '@ngrx/store';

import { CartItem } from './../cart.model';

export enum CartActionTypes {
  ADD_ONE = '[Cart] Add One',
  REMOVE_ONE = '[Cart] Remove One'
}

export class AddOne implements Action {
  readonly type = CartActionTypes.ADD_ONE;

  constructor(public payload: CartItem) {}
}

export class RemoveOne implements Action {
  readonly type = CartActionTypes.REMOVE_ONE;

  constructor(public payload: number) {}
}

export type CartActions = AddOne | RemoveOne;
