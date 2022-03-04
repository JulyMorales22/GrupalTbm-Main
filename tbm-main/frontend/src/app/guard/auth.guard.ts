import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';//router para cuando vamos a hacer una redireccion

import { UserService } from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 //con CanActive para habilitar o no ciertas rutas

 constructor(private _userService: UserService, private _router: Router){}

  canActivate(): boolean{
    if (!this._userService.loggedIn()) {
      this._router.navigate(['/login']);
      return false;
    } else {
      return true
    }
  }
}
