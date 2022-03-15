import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
})
export class ListTaskComponent implements OnInit {
  taskData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2000;
  constructor(
    private _taskService: TaskService,
    private _snackBar: MatSnackBar
  ) {
    this.taskData = {};
  }

  ngOnInit(): void {
    this._taskService.listTask().subscribe({
      next: (v) => {
        this.taskData = v.taskList; //taskList como esta en el backend
      },
      error: (e) => {
        this.message = e.error.message;
        this.openSnackBarkError();
      },
    });
  }

  updateTask(task: any, status: string) {
    let tempStatus = task.taskStatus;
    task.taskStatus = status;
    this._taskService.updateTask(task).subscribe({
      next: (v) => {},
      error: (e) => {
        task.taskStatus = tempStatus;
        this.message = e.error.message;
        this.openSnackBarkError();
      },
    });
  }
  deleteTask(task: any) {
    this._taskService.deleteTask(task).subscribe({
      next: (v) => {
        let index = this.taskData.indexOf(task);
        if (index > -1) {
          this.taskData.splice(index, 1);
          this.message = v.message;
          this.openSnackBarSuccesfull();
        }
      },
      error: (e) => {
        e.message = e.error.message;
        this.openSnackBarkError;
      },
    });
  }

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, ' X ', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds,
      panelClass: ['styleSnackBarkSuccesfull'],
    });
  }
  openSnackBarkError() {
    this._snackBar.open(this.message, ' X ', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds,
      panelClass: ['styleSnackBarkError'],
    });
  }
}
