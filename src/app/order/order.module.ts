import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from '../material/material.module';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { SharedModule } from '../shared/shared.module';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderListComponent } from './containers/order-list/order-list.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderEffects } from './store/order.effect';
import { reducer } from './store/order.reducer';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature('order', reducer),
    EffectsModule.forFeature([OrderEffects])
  ],
  declarations: [OrderListComponent, OrderItemComponent],
  entryComponents: [LoadingComponent]
})
export class OrderModule {}
