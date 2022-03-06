import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
//quien es HttpInterceptor ?
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private _userService: UserService) {}

  //como un middleware en el front - interceptor  cuando el usuario intenta hacer algo
  intercept(req: any, next: any) {
    const tokenReq = req.clone({
      //para tomar el req normal y clonarlo y poder modificar esa copia
      setHeaders: {
        Authorization: 'Bearer ' + this._userService.getToken(),
      },
    });
    return next.handle(tokenReq); //handle: hacer lo siguiente ...
  }
}
