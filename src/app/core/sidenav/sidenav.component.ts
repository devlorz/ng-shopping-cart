import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Output()
  sidenavToggle = new EventEmitter();

  loadingDialogRef: MatDialogRef<LoadingComponent>;
  loadingSubscription: Subscription;

  constructor(
    public auth: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.getUser();
    this.loadingSubscription = this.auth.isLoading$.subscribe(isLoading => {
      if (isLoading) {
        setTimeout(() => {
          this.loadingDialogRef = this.dialog.open(LoadingComponent);
        });
      } else {
        if (this.loadingDialogRef) {
          this.loadingDialogRef.close();
        }
      }
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  onLogin() {
    this.auth.signIn();
    this.sidenavToggle.emit();
  }

  onLogOut() {
    this.auth.signOut();
    this.sidenavToggle.emit();
  }

  onClickOrder() {
    this.router.navigate(['order']);
    this.sidenavToggle.emit();
  }
}
