import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

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

  addProduct(productId: Product['id']) {
    console.log('adding product id : ', productId);
    this.cartStore
      .select(CartSelector.selectCarts)
      .pipe(map(cart => cart[productId]))
      .subscribe(value => {
        if (value) {
        } else {
          const item = createCartItem({ productId });
          this.cartStore.dispatch(new CartAction.AddOne(item));
        }
      });
  }
}
