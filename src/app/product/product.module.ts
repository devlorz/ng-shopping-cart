import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SlideshowModule } from 'ng-simple-slideshow';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from './../material/material.module';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductComponent } from './components/product/product.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ProductDetailWrapperComponent } from './containers/product-detail-wrapper/product-detail-wrapper.component';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductEffects } from './store/product.effect';
import { reducer } from './store/product.reducer';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SlideshowModule,
    StoreModule.forFeature('product', reducer),
    EffectsModule.forFeature([ProductEffects])
  ],
  declarations: [
    ProductListComponent,
    ProductComponent,
    SearchBarComponent,
    ProductDetailComponent,
    ProductDetailWrapperComponent
  ],
  entryComponents: [ProductDetailWrapperComponent]
})
export class ProductModule {}
