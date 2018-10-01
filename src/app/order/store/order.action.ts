import { Action } from '@ngrx/store';

import { Order } from './../order.model';

export enum OrderActionTypes {
  GetOrders = '[Order] Get Orders',
  GetOrdersSuccess = '[Order] Get Orders Success',
  GetOrdersFail = '[Order] Get Orders Fail'
}

export class GetOrders implements Action {
  readonly type = OrderActionTypes.GetOrders;
}

export class GetOrdersSuccess implements Action {
  readonly type = OrderActionTypes.GetOrdersSuccess;

  constructor(public payload: Array<Order>) {}
}

export class GetOrdersFail implements Action {
  readonly type = OrderActionTypes.GetOrdersFail;

  constructor(public payload: any) {}
}

export type OrderActions = GetOrders | GetOrdersSuccess | GetOrdersFail;
