import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, withLatestFrom } from 'rxjs/operators';

import { Product } from '../../../product/product.model';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { CartItem } from '../../cart.model';
import { CartService } from '../../cart.service';
import { NumberPickerDialogComponent } from './../../../shared/components/number-picker-dialog/number-picker-dialog.component';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit, OnDestroy {
  dataSource$: Observable<Array<CartItem & Product>>;
  total$: Observable<number>;
  loadingDialogRef: MatDialogRef<LoadingComponent>;
  ngUnsubscribe$ = new Subject();

  constructor(private cartService: CartService, private dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource$ = this.cartService.selectItems$;
    this.total$ = this.cartService.selectTotal$;
    this.cartService.isLoading$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(isLoading => {
        if (isLoading) {
          this.loadingDialogRef = this.dialog.open(LoadingComponent);
        } else {
          if (this.loadingDialogRef) {
            this.loadingDialogRef.close();
          }
        }
      });
    this.cartService.errorMessage$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(message => {
        if (message) {
          const dialogRef = this.dialog.open(DialogComponent, {
            data: {
              message,
              isConfirm: false
            }
          });

          dialogRef
            .afterClosed()
            .subscribe(_ => this.cartService.resetErrorMessage());
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onDelete(id: number) {
    const dialog = this.dialog.open(DialogComponent, {
      data: {
        message: 'Are you sure you want to remove this product?',
        isConfirm: true
      }
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
      data: {
        message: 'Are you sure you want to checkout?',
        isConfirm: true
      }
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
