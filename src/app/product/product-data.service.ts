import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

import { Product } from './product.model';

const mockProducts = [
  {
    id: 1,
    title: 'dog',
    description: 'test description',
    price: 20000
  },
  {
    id: 2,
    title: 'shiba',
    description: 'test description',
    price: 20000
  }
];

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  get(): Observable<Product[]> {
    return timer(500).pipe(mapTo(mockProducts));
  }
}
