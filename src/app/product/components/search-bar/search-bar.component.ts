import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Input()
  searchText: string;
  @Output()
  search: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onSearch(searchText: string) {
    this.search.emit(searchText);
  }
}
