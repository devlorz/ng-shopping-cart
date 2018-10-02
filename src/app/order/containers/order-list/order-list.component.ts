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

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.getUserInfo().subscribe(user => {
      if (user) {
        this.orderService.getOrders();
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
