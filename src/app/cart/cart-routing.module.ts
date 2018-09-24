import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartListComponent } from './containers/cart-list/cart-list.component';

const routes: Routes = [{ path: '', component: CartListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule {}
