import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { Product } from '../../product.model';
import { ProductService } from '../../product.service';
import { startWith, switchMap } from 'rxjs/operators';
import { CartService } from '../../../cart/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  search = new FormControl();

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.get().subscribe();

    this.products$ = this.productService.getProductByName('');
    // this.search.valueChanges.pipe(
    //   startWith(''),
    //   switchMap(value => this.productService.getProductByName(value))
    // );
  }

  onAddToCart(product: Product) {
    console.log('on add prodcut');
    this.cartService.addProduct(product.id);
  }

  onRemoveFromCart(product: Product) {}

  onSearch(text: string) {
    this.products$ = this.productService.getProductByName(text);
  }
}
