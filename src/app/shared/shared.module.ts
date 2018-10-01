import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NumberPickerComponent } from './components/number-picker/number-picker.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [NumberPickerComponent, DialogComponent, LoadingComponent],
  exports: [NumberPickerComponent]
})
export class SharedModule {}
