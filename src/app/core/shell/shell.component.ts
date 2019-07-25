import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { pluck } from 'rxjs/operators';

import { CartService } from '../../cart/cart.service';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {
  @ViewChild('sidenav', { static: true })
  sidenav;
  public isSmallScreen: boolean;
  public isFull = false;

  get sideNavMode() {
    return this.isSmallScreen ? 'over' : 'side';
  }

  get isWidthFull() {
    if (!this.isSmallScreen) {
      return this.isFull;
    }
    return false;
  }

  get isWidthWithSidenav() {
    if (!this.isSmallScreen) {
      return !this.isFull;
    }
    return false;
  }

  cartItems$ = this.cartService.selectAmount$;

  constructor(
    private breakPointObserver: BreakpointObserver,
    private router: Router,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.breakPointObserver
      .observe(['(max-width: 991px)'])
      .pipe(pluck('matches'))
      .subscribe((isSmall: boolean) => (this.isSmallScreen = isSmall));

    this.productService.getProducts();
  }

  menuClick() {
    if (!this.isSmallScreen) {
      this.isFull = !this.isFull;
    }
  }

  cartClick() {
    this.router.navigate(['cart']);
  }

  homeClick() {
    this.router.navigate(['']);
  }

  onSidenavToggle() {
    if (this.isSmallScreen) {
      this.sidenav.toggle();
    }
  }
}
