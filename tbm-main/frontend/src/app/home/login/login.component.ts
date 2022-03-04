import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2000;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBark: MatSnackBar
  ) { 
    this.loginData = {};
  }

  login() {
    if (
      !this.loginData.email ||
      !this.loginData.password
    ) {
      this.message = 'Incomplete data';
      this.openSnackBarkError();
    } else {
      this._userService.login(this.loginData).subscribe({
        next: (v)=>{
          localStorage.setItem('token', v.token);
          this._router.navigate(['/listTask']);
        },
        error: (e) =>{
          this.message = e.error.message;
          this.openSnackBarkError();
        }
      });
    }
  }

  openSnackBarkError() {
    this._snackBark.open(this.message, ' X ', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds,
      panelClass: ['styleSnackBarkError']
    })
  }
  ngOnInit(): void {
  }

}
