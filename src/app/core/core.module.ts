import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CartEffects } from '../cart/store/cart.effect';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from './../material/material.module';
import { HeaderComponent } from './header/header.component';
import { ShellComponent } from './shell/shell.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AuthEffects } from './store/auth.effect';
import { reducer } from 'src/app/core/store/auth.reducer';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    SharedModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  exports: [ShellComponent],
  declarations: [HeaderComponent, ShellComponent, SidenavComponent],
  entryComponents: [LoadingComponent]
})
export class CoreModule {}
