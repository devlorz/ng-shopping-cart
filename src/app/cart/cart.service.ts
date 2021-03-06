import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, publishReplay, refCount } from 'rxjs/operators';

import { createOrder } from '../order/order.model';
import { Product } from '../product/product.model';
import { CartItem, createCartItem } from './cart.model';
import * as CartAction from './store/cart.action';
import { State as CartState } from './store/cart.reducer';
import * as CartSelector from './store/cart.selector';

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

  errorMessage$ = this.cartStore.select(CartSelector.getErrorMessage);

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

  resetErrorMessage() {
    this.cartStore.dispatch(new CartAction.ResetErrorMessage());
  }
}
