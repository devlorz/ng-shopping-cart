import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../../core/auth/auth.service';
import { OrderService } from '../../order.service';
import { LoadingComponent } from './../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders$ = this.orderService.getAllOrders();
  ngUnsubscribe$ = new Subject();
  loadingDialogRef: MatDialogRef<LoadingComponent>;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.authService
      .getUserInfo()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(user => {
        if (user) {
          this.orderService.getOrders();
        }
      });

    this.orderService.isLoading$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(isLoading => {
        if (isLoading) {
          setTimeout(() => {
            this.loadingDialogRef = this.dialog.open(LoadingComponent);
          });
        } else {
          if (this.loadingDialogRef) {
            this.loadingDialogRef.close();
          }
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
