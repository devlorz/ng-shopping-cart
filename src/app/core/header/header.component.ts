import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input()
  cartItem: number;
  @Output()
  menuBtnClick = new EventEmitter();
  @Output()
  cartBtnClick = new EventEmitter();
  @Output()
  homeBtnClick = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
