import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css'],
})
export class SaveTaskComponent implements OnInit {
  registerData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2000;

  constructor(
    private _taskService: TaskService,
    private _router: Router,
    private _snackBark: MatSnackBar
  ) {
    this.registerData = {};
  }

  saveTask() {
    if (!this.registerData.name || !this.registerData.description) {
      this.message = 'Incomplete data';
      this.openSnackBarkError();
    } else {
      this._taskService.saveTask(this.registerData).subscribe({
        next: (v) => {
          this._router.navigate(['/listTask']);
          this.message = 'Succesfull task registration';
          this.openSnackBarSuccesfull();
        },
        error: (e) => {
          this.message = e.error.message;
          this.openSnackBarkError();
        },
      });
    }
  }
  openSnackBarSuccesfull() {
    this._snackBark.open(this.message, ' X ', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds,
      panelClass: ['styleSnackBarkSuccesfull'],
    });
  }
  openSnackBarkError() {
    this._snackBark.open(this.message, ' X ', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds,
      panelClass: ['styleSnackBarkError'],
    });
  }
  ngOnInit(): void {}
}
