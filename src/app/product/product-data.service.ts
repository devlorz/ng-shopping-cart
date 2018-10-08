import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  constructor(private afs: AngularFirestore) {}

  getProducts() {
    return this.afs
      .collection(`products`)
      .valueChanges()
      .pipe(take(1));
  }
}
