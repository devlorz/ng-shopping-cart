import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Store } from '@ngrx/store';

import { State as AuthState } from './store/auth.reducer';
import { Login, Logout, GetUser } from './store/auth.action';
import { getUser as getUserState } from './store/auth.selector';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private store: Store<AuthState>
  ) {}

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

  getUserFromFirebaseAuth() {
    return this.afAuth.authState;
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  firebaseSignOut() {
    this.afAuth.auth.signOut();
  }

  signup(email: string, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider);
  }
}
