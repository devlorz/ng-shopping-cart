import { ResetOrders } from './../../order/store/order.action';
import { AuthDataService } from '../auth/auth-data.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { exhaustMap, map, catchError, tap } from 'rxjs/operators';
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

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthDataService,
    private router: Router,
    private orderService: OrderService
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
