import { MaterialModule } from './../../../material/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { DialogComponent } from './dialog.component';
import { OverlayContainer } from '@angular/cdk/overlay';

const dialogData = {
  message: 'test dialog',
  isConfirm: true
};

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'view-container-directive'
})
class ViewContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  selector: 'app-view-container-component',
  template: `<view-container-directive></view-container-directive>`
})
class ViewContainerComponent {
  @ViewChild(ViewContainerDirective)
  childWithViewContainer: ViewContainerDirective;

  get childViewContainer() {
    return this.childWithViewContainer.viewContainerRef;
  }
}

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let overlayContainerElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [DialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
        {
          provide: OverlayContainer,
          useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return { getContainerElement: () => overlayContainerElement };
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
