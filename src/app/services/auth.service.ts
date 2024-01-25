import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Response } from '../interfaces/response';
import { Login } from '../interfaces/login';
import { LoginForm } from '../interfaces/login-form';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = "https://localhost:7057/api/Usuario/login";

  private authSubject$ : BehaviorSubject<Login> = new BehaviorSubject<Login>({ correo: '', token: '' })

  public usuario: Observable<Login>

  public get auth(): Login{
    return this.authSubject$.value
  }

  constructor(private http: HttpClient) {
    this.usuario = this.authSubject$.asObservable()
  }

  login(login: any): Observable<Response>{
    return this.http.post<Response>(this.apiUrl,login, httpOption).pipe(
      map(res => {
        if (res.exito === 1) {
          const auth: Login = res.data;
          localStorage.setItem('auth', JSON.stringify(auth));
          this.authSubject$.next(auth);
        }return res
      })
    )
  }

  logout(){
    localStorage.removeItem('auth');
    this.authSubject$.next({ correo: '', token: '' })
  }


}
