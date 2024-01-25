import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Login } from './interfaces/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WSVentas-FE';
  usuario!: Login

  constructor(public _authService: AuthService, private router: Router) {

    this._authService.usuario.subscribe(res => {
      this.usuario = res
      console.log(res + ' Cambió el usuario')
      console.log(this._authService.auth)

    })
  }

  logout(){
    this._authService.logout()
    this.router.navigate(['/login'])
  }




}
