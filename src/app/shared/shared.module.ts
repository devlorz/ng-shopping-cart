import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NumberPickerComponent } from './components/number-picker/number-picker.component';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [NumberPickerComponent, DialogComponent],
  exports: [NumberPickerComponent]
})
export class SharedModule {}
