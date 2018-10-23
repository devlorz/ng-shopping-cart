import { NgModule } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';

import { NumberPickerComponent } from './../number-picker/number-picker.component';
import { NumberPickerDialogComponent } from './number-picker-dialog.component';

@NgModule({
  imports: [FormsModule, MaterialModule],
  declarations: [NumberPickerDialogComponent, NumberPickerComponent],
  entryComponents: [NumberPickerDialogComponent],
  exports: [NumberPickerDialogComponent]
})
class TestModule {}

describe('NumberPickerDialogComponent', () => {
  let component: NumberPickerDialogComponent;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule, NoopAnimationsModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: 5 }]
    }).compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    const dialogRef = dialog.open(NumberPickerDialogComponent);
    component = dialogRef.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
