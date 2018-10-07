import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ProductDataService } from './product-data.service';
import { Product } from './product.model';
import { State as ProductState } from './store/product.reducer';
import * as ProductAction from './store/product.action';
import * as ProductSelector from './store/product.selector';
import { GetProducts } from './store/product.action';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private productStore: Store<ProductState>) {}

  isLoading$ = this.productStore.select(ProductSelector.getLoadingStatus);

  getProducts() {
    this.productStore.dispatch(new GetProducts());
  }

  getProductByKeyword(value: string) {
    return this.productStore
      .select(ProductSelector.getAllProducts)
      .pipe(
        map(products =>
          products.filter(
            product =>
              product.title.toLowerCase().includes(value) ||
              product.brand.toLowerCase().includes(value) ||
              product.type.toLowerCase().includes(value) ||
              product.category.toLowerCase().includes(value)
          )
        )
      );
  }

  getProductById(productId: number) {
    return this.productStore
      .select(ProductSelector.getAllProducts)
      .pipe(
        map(products => products.find(product => product.id === productId))
      );
  }
}
