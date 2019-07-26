import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Product } from '../../product.model';

@Component({
  selector: 'app-product-detail-wrapper',
  templateUrl: './product-detail-wrapper.component.html',
  styleUrls: ['./product-detail-wrapper.component.css']
})
export class ProductDetailWrapperComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    public dialogRef: MatDialogRef<ProductDetailWrapperComponent>
  ) {}

  ngOnInit() {}

  onAddToCart(idWithAmount) {
    this.dialogRef.close(idWithAmount);
  }
}
