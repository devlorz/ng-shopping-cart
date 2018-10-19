import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  map,
  tap,
  withLatestFrom,
  mergeMap
} from 'rxjs/operators';

import { AppState } from '../../app.reducer';
import { getUser } from '../../core/store/auth.selector';
import { User } from '../../core/user.model';
import { CartDataService } from './../cart-data.service';
import {
  CartActionTypes,
  ConfirmOrder,
  ConfirmOrderFail,
  ConfirmOrderSuccess,
  UpdateCartFail,
  UpdateCartSuccess
} from './cart.action';
import { ErrorMessage } from './cart.reducer';
import { getAllCartItems } from './cart.selector';

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
    concatMap<[ConfirmOrder, User], ConfirmOrderSuccess | ConfirmOrderFail>(
      ([action, user]: [ConfirmOrder, User]) => {
        if (user) {
          return this.cartService
            .updateOrder(action.payload, user.uid)
            .pipe(map(res => new ConfirmOrderSuccess()));
        } else {
          return of(new ConfirmOrderFail(ErrorMessage.NotLogin));
        }
      }
    ),
    catchError(err => of(new ConfirmOrderFail(err)))
  );

  @Effect({ dispatch: false })
  confirmOrderSuccess$ = this.actions$.pipe(
    ofType(CartActionTypes.ConfirmOrderSuccess),
    tap(_ => this.route.navigate(['']))
  );

  @Effect()
  updateCart$ = this.actions$.pipe(
    ofType(
      CartActionTypes.AddItem,
      CartActionTypes.AdjustQuantity,
      CartActionTypes.RemoveItem,
      CartActionTypes.ConfirmOrderSuccess
    ),
    withLatestFrom(this.store.select(getUser)),
    withLatestFrom(this.store.select(getAllCartItems)),
    filter(([[action, user], carts]) => user !== null),
    concatMap(([[action, user], carts]) =>
      this.cartService
        .updateCart(carts, user.uid)
        .pipe(map(_ => new UpdateCartSuccess()))
    ),
    catchError(err => of(new UpdateCartFail(err)))
  );
}
