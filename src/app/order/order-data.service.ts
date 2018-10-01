import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrderModule } from './order.module';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {
  constructor(private afs: AngularFirestore) {}

  getOrders(uid: string) {
    return this.afs.doc(`orders/${uid}`).valueChanges();
  }
}
