import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Route } from './core/route.service';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  Route.withShell([
    {
      path: '',
      loadChildren: './product/product.module#ProductModule'
    },
    {
      path: 'cart',
      loadChildren: './cart/cart.module#CartModule'
    },
    {
      path: 'order',
      loadChildren: './order/order.module#OrderModule',
      canActivate: [AuthGuard]
    }
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
