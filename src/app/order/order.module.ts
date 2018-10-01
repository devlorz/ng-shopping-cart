import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './containers/order-list/order-list.component';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
  imports: [CommonModule, OrderRoutingModule],
  declarations: [OrderListComponent]
})
export class OrderModule {}
