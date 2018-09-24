import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './containers/cart-list/cart-list.component';
import { MaterialModule } from '../material/material.module';
import { reducer } from 'src/app/cart/store/cart.reducer';

@NgModule({
  imports: [CommonModule, CartRoutingModule, MaterialModule],
  declarations: [CartListComponent]
})
export class CartModule {}
