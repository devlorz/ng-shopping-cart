import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material/material.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/product.reducer';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductDetailWrapperComponent } from './containers/product-detail-wrapper/product-detail-wrapper.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('product', reducer)
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
