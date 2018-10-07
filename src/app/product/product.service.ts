import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { GetProducts } from './store/product.action';
import { State as ProductState } from './store/product.reducer';
import * as ProductSelector from './store/product.selector';

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
