import { NumberPickerDialogComponent } from './../../../shared/components/number-picker-dialog/number-picker-dialog.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { tap, filter, withLatestFrom } from 'rxjs/operators';

import { CartItem } from '../../cart.model';
import { Product } from '../../../product/product.model';
import { CartService } from '../../cart.service';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit, OnDestroy {
  dataSource$: Observable<Array<CartItem & Product>>;
  total$: Observable<number>;
  loadingDialogRef: MatDialogRef<LoadingComponent>;
  loadingSubscription: Subscription;

  constructor(private cartService: CartService, private dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource$ = this.cartService.selectItems$;
    this.total$ = this.cartService.selectTotal$;
    this.loadingSubscription = this.cartService.isLoading$.subscribe(
      isLoading => {
        if (isLoading) {
          this.loadingDialogRef = this.dialog.open(LoadingComponent);
        } else {
          if (this.loadingDialogRef) {
            this.loadingDialogRef.close();
          }
        }
      }
    );
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
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
    const dialog = this.dialog.open(NumberPickerDialogComponent, {
      data: quantity
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.cartService.adjustQuantity(id, result);
      }
    });
  }

  onCheckout() {
    const dialog = this.dialog.open(DialogComponent, {
      data: 'Are you sure you want to checkout?'
    });
    dialog
      .afterClosed()
      .pipe(
        filter(result => result),
        withLatestFrom(this.cartService.selectItems$)
      )
      .subscribe(([_, data]) => this.cartService.confirmOrder(data));
  }
}
