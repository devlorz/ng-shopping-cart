import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  constructor(private afAuth: AngularFireAuth) {}

  getUserFromFirebaseAuth() {
    return this.afAuth.authState;
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return from(this.oAuthLogin(provider));
  }

  firebaseSignOut() {
    return from(this.afAuth.auth.signOut());
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider);
  }
}
