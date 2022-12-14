import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public login: LoginService) {}

  ngOnInit(): void {
    if (this.login.isLogin()) {
      this.login.loginStatus.next(true);
    }
  }
}
