import { OrderEffects } from './store/order.effect';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { OrderListComponent } from './containers/order-list/order-list.component';
import { OrderRoutingModule } from './order-routing.module';
import { reducer } from './store/order.reducer';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    MaterialModule,
    StoreModule.forFeature('order', reducer),
    EffectsModule.forFeature([OrderEffects])
  ],
  declarations: [OrderListComponent, OrderItemComponent]
})
export class OrderModule {}
