import { NgModule } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './../../../material/material.module';
import { DialogComponent } from './dialog.component';

const dialogData = {
  message: 'test dialog',
  isConfirm: true
};

@NgModule({
  declarations: [DialogComponent],
  entryComponents: [DialogComponent],
  exports: [DialogComponent]
})
class TestModule {}

describe('DialogComponent', () => {
  let component: DialogComponent;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule, TestModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: dialogData }]
    }).compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MatDialog);
    const dialogRef = dialog.open(DialogComponent);
    component = dialogRef.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
