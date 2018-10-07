import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from '../../product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input()
  product: Product;
  @Output()
  addToCart = new EventEmitter();

  get title() {
    return (this.product.brand + ' ' + this.product.title).toUpperCase();
  }

  private amount: number;

  constructor() {}

  ngOnInit() {}

  onAmountChange(amount: number) {
    this.amount = amount;
  }

  onAddToCart() {
    this.addToCart.emit({
      id: this.product.id,
      amount: this.amount
    });
  }
}
