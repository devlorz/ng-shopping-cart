import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

import { Product } from './product.model';

const mockProducts = [
  {
    id: 1,
    title: 'dog',
    description: 'this is a dog',
    price: 10000
  },
  {
    id: 2,
    title: 'shiba',
    description: 'thi is shiba',
    price: 20000
  },
  {
    id: 3,
    title: 'inu',
    description: 'this is inu',
    price: 30000
  },
  {
    id: 4,
    title: 'bok',
    description: 'this is bok',
    price: 40000
  },
  {
    id: 5,
    title: 'wolf',
    description: 'this is wolf',
    price: 50000
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
