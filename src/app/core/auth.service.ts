import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { State as AuthState } from './store/auth.reducer';
import { Login, Logout, GetUser } from './store/auth.action';
import {
  getUser as getUserState,
  getLoadingStatus
} from './store/auth.selector';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store<AuthState>) {}

  isLoading$ = this.store.select(getLoadingStatus);

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
