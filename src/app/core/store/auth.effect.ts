import { AuthDataService } from './../auth-data.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { exhaustMap, map, catchError, tap } from 'rxjs/operators';
import { User as FirebaseUser } from 'firebase';

import {
  AuthActionTypes,
  LoginSuccess,
  LoginFailure,
  GetUserSuccess
} from './auth.action';
import { User } from '../user.model';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthDataService
  ) {}

  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    exhaustMap(action =>
      from(this.authService.googleLogin()).pipe(
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
    exhaustMap(action =>
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
        catchError(error => of(new LoginFailure(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    tap(() => this.authService.firebaseSignOut())
  );
}
