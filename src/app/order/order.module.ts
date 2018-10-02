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
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { SharedModule } from '../shared/shared.module';

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
