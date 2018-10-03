import { Dictionary } from '@ngrx/entity';
import {
  GetCartItemSuccess,
  GetCartItemFail
} from './../../cart/store/cart.action';
import { CartDataService } from './../../cart/cart-data.service';
import { AppState } from './../../app.reducer';
import { ResetOrders } from './../../order/store/order.action';
import { AuthDataService } from '../auth/auth-data.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import {
  exhaustMap,
  map,
  catchError,
  tap,
  withLatestFrom,
  concatMap
} from 'rxjs/operators';
import { User as FirebaseUser } from 'firebase';

import {
  AuthActionTypes,
  LoginSuccess,
  LoginFailure,
  GetUserSuccess,
  GetUserFailure,
  LogoutSuccess,
  LogoutFailure
} from './auth.action';
import { User } from '../user.model';
import { OrderService } from '../../order/order.service';
import { Store } from '@ngrx/store';
import { getUser } from './auth.selector';
import { CartItem } from '../../cart/cart.model';

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
        tap(credential => console.log(credential)),
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
        map(
          (cartItems: Dictionary<CartItem>) => new GetCartItemSuccess(cartItems)
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
        tap(user => console.log(user)),
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
    map(_ => new ResetOrders())
  );
}
