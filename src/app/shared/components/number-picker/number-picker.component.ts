import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-number-picker',
  templateUrl: './number-picker.component.html',
  styleUrls: ['./number-picker.component.css']
})
export class NumberPickerComponent implements OnInit {
  @Input()
  default: number;
  @Output()
  valueChange = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
