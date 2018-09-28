import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { from } from 'rxjs';

import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {
  constructor(private afs: AngularFirestore) {}

  updateOrder(order: Order, uid: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    return from(userRef.set(order, { merge: true }));
  }
}
