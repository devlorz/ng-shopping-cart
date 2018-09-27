import { NgModule } from '@angular/core';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatTableModule,
  MatListModule,
  MatBadgeModule,
  MatDialogModule
} from '@angular/material';
import { NumberPickerModule } from '@retailify/ngx-mat-numberpicker';

@NgModule({
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatBadgeModule,
    MatDialogModule,
    NumberPickerModule
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatBadgeModule,
    MatDialogModule,
    NumberPickerModule
  ]
})
export class MaterialModule {}
