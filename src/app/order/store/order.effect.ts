import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { AppState } from '../../app.reducer';
import { OrderDataService } from '../order-data.service';
import { Order } from '../order.model';
import { getUser } from './../../core/store/auth.selector';
import {
  GetOrdersFail,
  GetOrdersSuccess,
  OrderActionTypes
} from './order.action';

@Injectable()
export class OrderEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private orderService: OrderDataService
  ) {}

  @Effect()
  getOrders$ = this.actions$.pipe(
    ofType(OrderActionTypes.GetOrders),
    withLatestFrom(this.store.select(getUser)),
    switchMap(([action, user]) =>
      this.orderService.getOrders(user.uid).pipe(
        map((result: any) => result.orders),
        map((orders: Array<Order>) => new GetOrdersSuccess(orders)),
        catchError(error => of(new GetOrdersFail(error)))
      )
    )
  );
}
