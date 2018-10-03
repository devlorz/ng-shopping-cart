import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowModule } from 'ng-simple-slideshow';
import { MaterialModule } from '../material/material.module';
import { NumberPickerComponent } from './components/number-picker/number-picker.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NumberPickerModule } from '@retailify/ngx-mat-numberpicker';

@NgModule({
  imports: [CommonModule, MaterialModule, SlideshowModule, NumberPickerModule],
  declarations: [NumberPickerComponent, DialogComponent, LoadingComponent],
  exports: [NumberPickerComponent]
})
export class SharedModule {}
