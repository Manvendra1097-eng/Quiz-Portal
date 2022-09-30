import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  // variables
  success: boolean = false;
  required: boolean = false;
  error: string = '';
  public user = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  // register user
  signup(signUp: NgForm) {
    if (this.user.username == '' || this.user.username == null) {
      this.required = true;
      return;
    }

    this.userService.addUser(this.user).subscribe({
      next: (data) => {
        console.warn(data);
        this.success = true;
        signUp.reset();
      },
      error: (error) => {
        this.error = error.error.message;
        console.log(error);
      },
    });
  }

  // reset alert
  reset() {
    this.required = false;
    this.success = false;
    this.error = '';
    return;
  }
}
