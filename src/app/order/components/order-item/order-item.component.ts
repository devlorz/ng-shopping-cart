import { Component, OnInit, Input } from '@angular/core';

import { Order, OrderItem } from './../../order.model';

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

  displayedColumns: Array<string> = ['title', 'quantity', 'total'];

  constructor() {}

  ngOnInit() {}
}
