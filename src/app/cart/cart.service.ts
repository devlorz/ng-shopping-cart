import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { map, publishReplay, refCount } from 'rxjs/operators';

import { Product } from '../product/product.model';
import { State as CartState } from './store/cart.reducer';
import * as CartSelector from './store/cart.selector';
import * as CartAction from './store/cart.action';
import { createCartItem, CartItem } from './cart.model';
import { createOrder } from '../order/order.model';

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

  isLoading$ = this.cartStore.select(CartSelector.getLoadingStatus);

  addProduct(productId: Product['id'], quantity = 1) {
    const item = createCartItem({ productId, quantity });
    this.cartStore.dispatch(new CartAction.AddItem(item));
  }

  removeProduct(productId: Product['id']) {
    this.cartStore.dispatch(new CartAction.RemoveItem(productId));
  }

  adjustQuantity(id: Product['id'], quantity: number) {
    this.cartStore.dispatch(
      new CartAction.AdjustQuantity({
        id,
        quantity
      })
    );
  }

  confirmOrder(items: Array<CartItem & Product>) {
    const order = createOrder(items);
    this.cartStore.dispatch(new CartAction.ConfirmOrder(order));
  }
}
