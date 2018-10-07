import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SlideshowModule } from 'ng-simple-slideshow';

import { MaterialModule } from '../material/material.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NumberPickerDialogComponent } from './components/number-picker-dialog/number-picker-dialog.component';
import { NumberPickerComponent } from './components/number-picker/number-picker.component';

@NgModule({
  imports: [CommonModule, MaterialModule, SlideshowModule, FormsModule],
  declarations: [
    NumberPickerComponent,
    DialogComponent,
    LoadingComponent,
    NumberPickerDialogComponent
  ],
  exports: [NumberPickerComponent]
})
export class SharedModule {}
