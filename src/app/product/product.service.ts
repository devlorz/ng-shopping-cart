import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ProductDataService } from './product-data.service';
import { Product } from './product.model';
import { State as ProductState } from './store/product.reducer';
import * as ProductAction from './store/product.action';
import * as ProductSelector from './store/product.selector';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private productDataService: ProductDataService,
    private productStore: Store<ProductState>
  ) {}

  get(): Observable<Product[]> {
    return this.productDataService
      .get()
      .pipe(
        tap(response =>
          this.productStore.dispatch(new ProductAction.SetAllProducts(response))
        )
      );
  }

  getProductByName(value: string) {
    return this.productStore
      .select(ProductSelector.getAllProducts)
      .pipe(
        map(products =>
          products.filter(product =>
            product.title.toLowerCase().includes(value)
          )
        )
      );
  }
}
