import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  islogin = false;
  user: any = null;
  roleName = '';
  constructor(
    public loginService: LoginService,
    private route: Router,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginService.loginStatus.asObservable().subscribe((loginStatus) => {
      this.islogin = this.loginService.isLogin();
      this.user = this.loginService.getUser();
      this.roleName = this.loginService.getUserRole();
      if (this.roleName == 'NORMAL') {
        this.roleName = 'user';
      } else {
        this.roleName = 'admin';
      }
    });
  }

  logout() {
    this.loginService.logout();
    this.loginService.loginStatus.next(false);
    this._snack.open('Logout Successfully', 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['green-snack'],
    });
    this.route.navigate(['login']);
  }
}
