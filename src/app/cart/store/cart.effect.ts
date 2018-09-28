import { CartDataService } from './../cart-data.service';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  CartActionTypes,
  ConfirmOrder,
  ConfirmOrderSuccess,
  ConfirmOrderFail
} from './cart.action';
import {
  exhaustMap,
  tap,
  map,
  catchError,
  withLatestFrom
} from 'rxjs/operators';
import { getUser } from '../../core/store/auth.selector';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { User } from '../../core/user.model';
import { of } from 'rxjs';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private cartService: CartDataService
  ) {}

  @Effect()
  confirmOrder$ = this.actions$.pipe(
    ofType(CartActionTypes.ConfirmOrder),
    withLatestFrom(this.store.select(getUser)),
    exhaustMap(([action, user]: [ConfirmOrder, User]) =>
      this.cartService.updateOrder(action.payload, user.uid).pipe(
        tap(result => console.log(result)),
        map(res => new ConfirmOrderSuccess()),
        catchError(err => of(new ConfirmOrderFail()))
      )
    )
  );
}
