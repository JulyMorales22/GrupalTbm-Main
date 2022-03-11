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
  constructor(private _taskService: TaskService, private _snackBar: MatSnackBar) {
    this.taskData = {};
  }

  ngOnInit(): void {
    this._taskService.listTask().subscribe({
      next:(v)=>{
        this.taskData = v.taskList //taskList como esta en el backend 
      },
      error:(e) =>{
        this.message = e.error.message;
        this.openSnackBarkError();
      }
    })
  }

  updateTask(task:any, status:string){}
  deleteTask(task:any){}

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
}
