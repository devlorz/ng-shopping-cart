import { ProductRoutingModule } from './product-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './containers/product-list/product-list.component';

@NgModule({
  imports: [CommonModule, ProductRoutingModule],
  declarations: [ProductListComponent]
})
export class ProductModule {}
