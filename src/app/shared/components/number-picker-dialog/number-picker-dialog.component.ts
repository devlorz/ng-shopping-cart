import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-number-picker-dialog',
  templateUrl: './number-picker-dialog.component.html',
  styleUrls: ['./number-picker-dialog.component.css']
})
export class NumberPickerDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NumberPickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public defaultValue: number
  ) {}

  ngOnInit() {}

  onOK() {
    this.dialogRef.close(this.defaultValue);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
