import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(private login: LoginService) {}

  ngOnInit(): void {
    if (this.login.isLogin()) {
      this.login.loginStatus.next(true);
    }
  }
}
