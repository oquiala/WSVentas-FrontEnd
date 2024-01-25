import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { Response } from './../interfaces/response';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl: string =  "https://localhost:7057/api/Usuario";

  constructor(private http: HttpClient) { }

  getUsers():Observable<Response> {
    return this.http.get<Response>(this.apiUrl)
  }

  addUser(user: Usuario): Observable<Response> {
    return this.http.post<Response>(this.apiUrl, user, httpOption);
  }

  editUser(user: Usuario): Observable<Response> {
    return this.http.put<Response>(this.apiUrl, user, httpOption);
  }

  delUser(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.apiUrl}?IdUser=${id}`);
  }
}
