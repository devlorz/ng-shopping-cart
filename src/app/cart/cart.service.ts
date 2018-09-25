import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { map, publishReplay, refCount } from 'rxjs/operators';

import { Product } from '../product/product.model';
import { State as CartState } from './store/cart.reducer';
import * as CartSelector from './store/cart.selector';
import * as CartAction from './store/cart.action';
import { createCartItem } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private cartStore: Store<CartState>) {}

  selectItems$ = this.cartStore.select(CartSelector.getCartsWithDetail).pipe(
    publishReplay(),
    refCount()
  );

  selectTotal$ = this.selectItems$.pipe(
    map(item => item.reduce((acc, cur) => acc + cur.total, 0))
  );

  selectAmount$ = this.selectItems$.pipe(map(item => item.length));

  addProduct(productId: Product['id']) {
    const item = createCartItem({ productId });
    this.cartStore.dispatch(new CartAction.AddOne(item));
  }

  removeProduct(productId: Product['id']) {
    this.cartStore.dispatch(new CartAction.RemoveOne(productId));
  }
}
