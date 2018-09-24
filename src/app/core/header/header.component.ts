import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output()
  menuBtnClick = new EventEmitter();
  @Output()
  cartBtnClick = new EventEmitter();
  @Output()
  homeBtnClick = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
