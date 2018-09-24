import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './containers/cart-list/cart-list.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [CommonModule, CartRoutingModule, MaterialModule],
  declarations: [CartListComponent]
})
export class CartModule {}
