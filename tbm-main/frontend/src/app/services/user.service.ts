import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private env: string;
  constructor(private _http: HttpClient) {
    this.env = environment.APP_URL;
  }

  registerUser(user: any) {
    return this._http.post<any>(this.env + 'user/register', user); //metodo que se va a enviar, ruta y json
  }
  login(user: any) {
    return this._http.post<any>(this.env + 'user/login', user);
  }

  loggedIn() {
    // return !!localStorage.getItem('token') un ternario para cuando vamos a devolver literal true o false, va y busca  si esta vacio devulve un false o  si tiene algo true
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
