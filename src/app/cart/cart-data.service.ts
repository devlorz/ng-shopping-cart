import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { from } from 'rxjs';

import { Order } from '../order/order.model';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {
  constructor(private afs: AngularFirestore) {}

  updateOrder(order: Order, uid: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `orders/${uid}`
    );

    return from(
      userRef.set(
        { orders: firestore.FieldValue.arrayUnion(order) },
        { merge: true }
      )
    );
  }
}
