import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  exhaustMap,
  tap,
  map,
  catchError,
  withLatestFrom
} from 'rxjs/operators';

import { getUser } from './../../core/store/auth.selector';
import {
  OrderActionTypes,
  GetOrdersSuccess,
  GetOrdersFail
} from './order.action';
import { AppState } from '../../app.reducer';
import { OrderDataService } from '../order-data.service';
import { Order } from '../order.model';
import { of } from 'rxjs';

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
    exhaustMap(([action, user]) =>
      this.orderService.getOrders(user.uid).pipe(
        tap(result => console.log(result)),
        map((result: any) => result.orders),
        map((orders: Array<Order>) => new GetOrdersSuccess(orders)),
        catchError(error => of(new GetOrdersFail(error)))
      )
    )
  );
}
