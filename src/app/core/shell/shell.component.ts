import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { pluck } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {
  public isSmallScreen: boolean;

  get sideNavMode() {
    return this.isSmallScreen ? 'over' : 'side';
  }

  constructor(
    private breakPointObserver: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit() {
    this.breakPointObserver
      .observe(['(max-width: 991px)'])
      .pipe(pluck('matches'))
      .subscribe((isSmall: boolean) => (this.isSmallScreen = isSmall));
  }

  cartClick() {
    this.router.navigate(['cart']);
  }

  homeClick() {
    this.router.navigate(['']);
  }
}
