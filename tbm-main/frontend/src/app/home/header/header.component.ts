import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  //userService va public porque otro archivo puede acceder a esa variable, el constructor es lo primero que se carga antes de que cargue la pagina 
  constructor(public _userService: UserService, private _router: Router) {}

  
  ngOnInit(): void {}//a penas cargue la pagina muuestra aca 

  logout(){
    this._userService.logout()
    this._router.navigate(['/login']);
  }
}
