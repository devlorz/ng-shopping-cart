import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.auth.getUser();
  }

  onSignup() {
    this.auth.signup('test@mail.com', 'password');
  }

  onLogin() {
    this.auth.signIn();
  }

  onLogOut() {
    this.auth.signOut();
  }
}
