import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  constructor(private afs: AngularFirestore) {}

  getProducts() {
    return this.afs.collection(`products`).valueChanges();
  }
}
