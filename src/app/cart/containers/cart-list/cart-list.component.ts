import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { CartItem } from '../../cart.model';
import { Product } from '../../../product/product.model';
import { CartService } from '../../cart.service';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import {
  take,
  tap,
  filter,
  exhaustMap,
  mergeMapTo,
  takeLast,
  withLatestFrom
} from 'rxjs/operators';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  dataSource$: Observable<Array<CartItem & Product>>;
  total$: Observable<number>;

  constructor(private cartService: CartService, private dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource$ = this.cartService.selectItems$;
    this.total$ = this.cartService.selectTotal$;
  }

  onDelete(id: number) {
    const dialog = this.dialog.open(DialogComponent, {
      data: 'Are you sure you want to remove this product?'
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.cartService.removeProduct(id);
      }
    });
  }

  onQuantityChange({ id, quantity }: { id: number; quantity: number }) {
    this.cartService.adjustQuantity(id, quantity);
  }

  onCheckout() {
    const dialog = this.dialog.open(DialogComponent, {
      data: 'Are you sure you want to checkout?'
    });
    dialog
      .afterClosed()
      .pipe(
        tap(result => console.log(result)),
        filter(result => result),
        withLatestFrom(this.cartService.selectItems$),
        tap(([_, data]) => console.log(data))
      )
      .subscribe(([_, data]) => this.cartService.confirmOrder(data));
  }
}
