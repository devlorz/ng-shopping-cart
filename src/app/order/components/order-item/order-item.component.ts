import { Component, Input, OnInit } from '@angular/core';

import { OrderItem } from './../../order.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Input()
  dataSource: Array<OrderItem>;
  @Input()
  total: number;
  @Input()
  orderNumber: string;
  @Input()
  orderDate: string;

  displayedColumns: Array<string> = ['title', 'quantity', 'total'];

  constructor() {}

  ngOnInit() {}
}
