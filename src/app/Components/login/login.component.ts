import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  public formLogin = this.formBuilder.group({
    correo: ['', Validators.required],
    clave: ['', Validators.required]
  })

  constructor(public _authService: AuthService, private router: Router, private formBuilder: FormBuilder, public snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  login(){
    this._authService.login(this.formLogin.value).subscribe(response => {
      if (response.exito === 1) {
        this.router.navigate(['/']);
      }
      else {
        this.snackBar.open(response.mensaje, 'Error!', { duration: 2000 })
      }
    })
  }

}
