import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loginStatus = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  // generate Toke
  generateToken(userDetails: { username: String; password: string }) {
    return this.http.post(`${baseUrl}/generate-token`, userDetails);
  }

  // get curent user
  getLoginUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  // set token
  setToken(token: string) {
    localStorage.setItem('token', token);
    return true;
  }

  // get token
  getToken() {
    return localStorage.getItem('token');
  }

  // Is user login
  isLogin() {
    let token = this.getToken();
    if (token == undefined || token == '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

  // set user
  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }

  // logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return;
  }

  // get user
  getUser() {
    let user = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    } else {
      this.logout();
      return null;
    }
  }

  // get user role
  getUserRole() {
    let user = this.getUser();
    if (user != null) {
      return user.authorities[0].authority;
    } else {
      return null;
    }
  }
}
