import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../cart.model';
import { Product } from '../../../product/product.model';
import { Observable } from 'rxjs';
import { CartService } from '../../cart.service';

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
  dataSource$: Observable<Array<CartItem & Product>>;
  total$: Observable<number>;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.dataSource$ = this.cartService.selectItems$;
    this.total$ = this.cartService.selectTotal$;
  }
}
