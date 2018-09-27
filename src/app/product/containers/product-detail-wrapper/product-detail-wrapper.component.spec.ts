import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailWrapperComponent } from './product-detail-wrapper.component';

describe('ProductDetailWrapperComponent', () => {
  let component: ProductDetailWrapperComponent;
  let fixture: ComponentFixture<ProductDetailWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
