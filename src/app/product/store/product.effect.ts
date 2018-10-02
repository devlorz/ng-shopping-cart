import { Product } from './../product.model';
import { ProductDataService } from './../product-data.service';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  ProductActionTypes,
  GetProductsSuccess,
  GetProductsFail
} from './product.action';
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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
        tap(products => console.log(products)),

        map(products => new GetProductsSuccess(products)),
        catchError(err => of(new GetProductsFail(err)))
      )
    )
  );
}
