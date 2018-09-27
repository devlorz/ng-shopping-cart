import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NumberPickerComponent } from './components/number-picker/number-picker.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [NumberPickerComponent],
  exports: [NumberPickerComponent]
})
export class SharedModule {}
