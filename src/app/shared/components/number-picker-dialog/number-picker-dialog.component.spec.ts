import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberPickerDialogComponent } from './number-picker-dialog.component';

xdescribe('NumberPickerDialogComponent', () => {
  let component: NumberPickerDialogComponent;
  let fixture: ComponentFixture<NumberPickerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NumberPickerDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberPickerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
