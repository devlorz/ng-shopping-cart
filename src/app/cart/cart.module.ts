import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './containers/cart-list/cart-list.component';
import { MaterialModule } from '../material/material.module';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { CartTableComponent } from './components/cart-table/cart-table.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { NumberPickerDialogComponent } from '../shared/components/number-picker-dialog/number-picker-dialog.component';

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
