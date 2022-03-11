import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private env: string;

  constructor(private _http: HttpClient) {
    this.env = environment.APP_URL;
  }

  saveTask(task: any) {
    return this._http.post<any>(this.env + 'task/saveTask', task); //metodo que se va a enviar, ruta y json
  }

  listTask(){
    return this._http.get<any>(this.env + 'task/listTask');
  }
  
}
