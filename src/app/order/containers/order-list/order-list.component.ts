import { LoadingComponent } from './../../../shared/components/loading/loading.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders$ = this.orderService.getAllOrders();
  userSubscription: Subscription;
  loadingSubscription: Subscription;
  loadingDialogRef: MatDialogRef<LoadingComponent>;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.getUserInfo().subscribe(user => {
      if (user) {
        this.orderService.getOrders();
      }
    });

    this.loadingSubscription = this.orderService.isLoading$.subscribe(
      isLoading => {
        if (isLoading) {
          setTimeout(() => {
            this.loadingDialogRef = this.dialog.open(LoadingComponent);
          });
        } else {
          if (this.loadingDialogRef) {
            this.loadingDialogRef.close();
          }
        }
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
