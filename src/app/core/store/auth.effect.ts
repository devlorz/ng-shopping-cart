import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { User as FirebaseUser } from 'firebase';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { CartItem } from '../../cart/cart.model';
import { AuthDataService } from '../auth/auth-data.service';
import { User } from '../user.model';
import { AppState } from './../../app.reducer';
import { CartDataService } from './../../cart/cart-data.service';
import {
  GetCartItemFail,
  GetCartItemSuccess,
  ResetCart
} from './../../cart/store/cart.action';
import { ResetOrders } from './../../order/store/order.action';
import {
  AuthActionTypes,
  GetUserFailure,
  GetUserSuccess,
  LoginFailure,
  LoginSuccess,
  LogoutFailure,
  LogoutSuccess
} from './auth.action';
import { getUser } from './auth.selector';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthDataService,
    private router: Router,
    private store: Store<AppState>,
    private cartService: CartDataService
  ) {}

  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    exhaustMap(_ =>
      this.authService.googleLogin().pipe(
        map(credential => {
          const {
            uid,
            email,
            displayName,
            photoURL
          } = credential.user as FirebaseUser;
          const user: User = {
            uid,
            email,
            displayName,
            photoURL
          };
          return new LoginSuccess(user);
        }),
        catchError(error => of(new LoginFailure(error)))
      )
    )
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess, AuthActionTypes.GetUserSuccess),
    withLatestFrom(this.store.select(getUser)),
    concatMap(([_, user]) =>
      this.cartService.getCartItem(user.uid).pipe(
        take(1),
        map(
          (cartItems: { carts: CartItem[] }) =>
            new GetCartItemSuccess(cartItems)
        ),
        catchError(err => of(new GetCartItemFail(err)))
      )
    )
  );

  @Effect()
  getUser$ = this.actions$.pipe(
    ofType(AuthActionTypes.GetUser),
    exhaustMap(_ =>
      this.authService.getUserFromFirebaseAuth().pipe(
        map((firebaseUser: FirebaseUser) => {
          const { uid, email, displayName, photoURL } = firebaseUser;
          const user: User = {
            uid,
            email,
            displayName,
            photoURL
          };
          return new GetUserSuccess(user);
        }),
        catchError(error => of(new GetUserFailure(error)))
      )
    )
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    exhaustMap(_ =>
      this.authService.firebaseSignOut().pipe(
        map(res => new LogoutSuccess()),
        catchError(err => of(new LogoutFailure(err)))
      )
    )
  );

  @Effect()
  logoutSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LogoutSuccess),
    tap(_ => this.router.navigate([''])),
    switchMap(_ => [new ResetOrders(), new ResetCart()])
  );
}
