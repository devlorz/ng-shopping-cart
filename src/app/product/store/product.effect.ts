import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { ProductDataService } from './../product-data.service';
import { Product } from './../product.model';
import {
  GetProductsFail,
  GetProductsSuccess,
  ProductActionTypes
} from './product.action';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductDataService
  ) {}

  readonly imageURL =
    'https://firebasestorage.googleapis.com/v0/b/simple-shopping-cart.appspot.com/o/products';

  @Effect()
  getProducts$ = this.actions$.pipe(
    ofType(ProductActionTypes.GetProducts),
    switchMap(_ =>
      this.productService.getProducts().pipe(
        map((products: Array<Product>) =>
          products.map(product => ({
            ...product,
            images: product.images.map(
              image => `${this.imageURL}${image}?alt=media`
            )
          }))
        ),
        map(products => new GetProductsSuccess(products)),
        catchError(err => of(new GetProductsFail(err)))
      )
    )
  );
}
