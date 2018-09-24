import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../cart.model';
import { Product } from '../../../product/product.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  displayedColumns: Array<string> = [
    'title',
    'description',
    'quantity',
    'total'
  ];
  displayedFooterColumns: Array<string> = ['title', 'total'];
  dataSource: Array<CartItem & Product> = [
    {
      total: 40000,
      quantity: 2,
      productId: 1,
      id: 1,
      title: 'dog',
      description: 'test description',
      price: 20000
    },
    {
      total: 20000,
      quantity: 1,
      productId: 2,
      id: 2,
      title: 'shiba',
      description: 'test description',
      price: 20000
    }
  ];

  constructor() {}

  ngOnInit() {}

  getTotal() {
    return '5000000';
  }
}
