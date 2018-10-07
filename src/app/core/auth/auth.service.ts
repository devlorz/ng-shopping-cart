import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { GetUser, Login, Logout } from '../store/auth.action';
import { State as AuthState } from '../store/auth.reducer';
import {
  getLoadingStatus,
  getLoggedInStatus,
  getUser as getUserState
} from '../store/auth.selector';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store<AuthState>) {}

  isLoading$ = this.store.select(getLoadingStatus);
  isLogin$ = this.store.select(getLoggedInStatus);

  getUserInfo() {
    return this.store.select(getUserState);
  }

  getUser() {
    this.store.dispatch(new GetUser());
  }

  signIn() {
    this.store.dispatch(new Login());
  }

  signOut() {
    this.store.dispatch(new Logout());
  }
}
