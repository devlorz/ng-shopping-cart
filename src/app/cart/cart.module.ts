import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { NumberPickerDialogComponent } from '../shared/components/number-picker-dialog/number-picker-dialog.component';
import { SharedModule } from './../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartTableComponent } from './components/cart-table/cart-table.component';
import { CartListComponent } from './containers/cart-list/cart-list.component';

@NgModule({
  imports: [CommonModule, CartRoutingModule, MaterialModule, SharedModule],
  declarations: [CartListComponent, CartTableComponent],
  entryComponents: [
    DialogComponent,
    LoadingComponent,
    NumberPickerDialogComponent
  ]
})
export class CartModule {}
