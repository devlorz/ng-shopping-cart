import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit() {}

  onSignup() {
    this.auth.signup('test@mail.com', 'password');
  }
}
