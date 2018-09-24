import { Action } from '@ngrx/store';

import { CartItem } from './../cart.model';

export enum CartActionTypes {
  ADD_ONE = '[Cart] Add One'
}

export class AddOne implements Action {
  readonly type = CartActionTypes.ADD_ONE;

  constructor(public payload: CartItem) {}
}

export type CartActions = AddOne;
