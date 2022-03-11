import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2000;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerData = {}; //un objeto vacio
  }

  //metodos, funciones
  registerUser() {
    if (
      !this.registerData.name ||
      !this.registerData.email ||
      !this.registerData.password
    ) {
      this.message = 'Incomplete data';
      this.openSnackBarkError();
    } else {
      this._userService.registerUser(this.registerData).subscribe({
        next: (v)=>{
          localStorage.setItem('token', v.token);
          this._router.navigate(['/saveTask']);
          this.message = 'Succesfull user registration';
          this.openSnackBarSuccesfull();
        },
        error: (e) =>{
          this.message = e.error.message;
          this.openSnackBarkError();
        }
      });
    }
  }
  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, ' X ', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds,
      panelClass: ['styleSnackBarkSuccesfull']
    })
  }
  openSnackBarkError() {
    this._snackBar.open(this.message, ' X ', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds,
      panelClass: ['styleSnackBarkError']
    })
  }

  ngOnInit(): void {}
}
