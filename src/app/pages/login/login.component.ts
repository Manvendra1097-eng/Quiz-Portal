import { NotExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  show: boolean = false;
  message: string = 'Username is required';

  public user = {
    username: '',
    password: '',
  };

  constructor(private loginService: LoginService, private route: Router) {}

  ngOnInit(): void {}

  loginForm(logIn: NgForm) {
    if (this.user.username.trim() == '' || this.user.username == null) {
      this.show = true;
      return;
    }
    if (this.user.password.trim() == '' || this.user.password == null) {
      this.show = true;
      this.message = 'Password is required';
      return;
    }
    // get token
    this.loginService.generateToken(this.user).subscribe({
      next: (data: any) => {
        this.loginService.setToken(data.token);
        this.loginService.getLoginUser().subscribe({
          next: (data) => {
            this.loginService.setUser(data);

            if (this.loginService.getUserRole() == 'ADMIN') {
              this.loginService.loginStatus.next(true);
              this.route.navigate(['admin']);
            } else if (this.loginService.getUserRole() == 'NORMAL') {
              this.loginService.loginStatus.next(true);
              this.route.navigate(['user/0']);
            } else {
              this.loginService.logout();
              this.show = true;
              this.message = 'Login please';
              this.route.navigate(['login']);
            }
          },
          error: (error) => {
            this.show = true;
            this.message = 'Something went wrong';
          },
        });
      },
      error: (error) => {
        this.show = true;
        this.message = 'Invalid Username or Password';
      },
    });
  }

  reset() {
    this.show = false;
    this.message = 'Username is required';
  }
}
