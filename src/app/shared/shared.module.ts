import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowModule } from 'ng-simple-slideshow';
import { MaterialModule } from '../material/material.module';
import { NumberPickerComponent } from './components/number-picker/number-picker.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NumberPickerDialogComponent } from './components/number-picker-dialog/number-picker-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SlideshowModule,
    FormsModule
  ],
  declarations: [NumberPickerComponent, DialogComponent, LoadingComponent, NumberPickerDialogComponent],
  exports: [NumberPickerComponent]
})
export class SharedModule {}
