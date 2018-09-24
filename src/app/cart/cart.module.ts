import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './containers/cart-list/cart-list.component';

@NgModule({
  imports: [CommonModule, CartRoutingModule],
  declarations: [CartListComponent]
})
export class CartModule {}
