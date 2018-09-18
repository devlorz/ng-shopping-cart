import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ProductDataService } from './product-data.service';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private productDataService: ProductDataService) {}

  get(): Observable<Product[]> {
    return this.productDataService.get();
  }
}
