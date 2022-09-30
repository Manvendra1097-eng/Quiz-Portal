import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-normal-dashboard',
  templateUrl: './normal-dashboard.component.html',
  styleUrls: ['./normal-dashboard.component.css'],
})
export class NormalDashboardComponent implements OnInit {
  constructor(private login: LoginService) {}

  ngOnInit(): void {
    if (this.login.isLogin()) {
      this.login.loginStatus.next(true);
    }
  }
}
