import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { HeaderComponent } from './header/header.component';
import { ShellComponent } from './shell/shell.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { SharedModule } from '../shared/shared.module';

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
