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
  withLatestFrom,
  concatMap,
  switchMap
} from 'rxjs/operators';
import { getUser } from '../../core/store/auth.selector';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { User } from '../../core/user.model';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private cartService: CartDataService,
    private route: Router
  ) {}

  @Effect()
  confirmOrder$ = this.actions$.pipe(
    ofType(CartActionTypes.ConfirmOrder),
    withLatestFrom(this.store.select(getUser)),
    concatMap(([action, user]: [ConfirmOrder, User]) => {
      if (user) {
        return this.cartService.updateOrder(action.payload, user.uid).pipe(
          tap(result => console.log(result)),
          map(res => new ConfirmOrderSuccess())
        );
      } else {
        return of(new ConfirmOrderFail('not login'));
      }
    }),
    catchError(err => of(new ConfirmOrderFail(err)))
  );

  @Effect({ dispatch: false })
  confirmOrderSuccess$ = this.actions$.pipe(
    ofType(CartActionTypes.ConfirmOrderSuccess),
    tap(_ => this.route.navigate(['']))
  );
}
