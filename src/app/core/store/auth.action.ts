import { Action } from '@ngrx/store';
import { User } from '../user.model';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  GetUser = '[Auth] Get User',
  GetUserSuccess = '[Auth] Get User Success',
  GetUserFailure = '[Auth] Get User Failure'
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public user: User) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class GetUser implements Action {
  readonly type = AuthActionTypes.GetUser;
}

export class GetUserSuccess implements Action {
  readonly type = AuthActionTypes.GetUserSuccess;

  constructor(public user: User) {}
}

export class GetUserFailure implements Action {
  readonly type = AuthActionTypes.GetUserFailure;

  constructor(public payload: any) {}
}

export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | Logout
  | GetUser
  | GetUserSuccess
  | GetUserFailure;
