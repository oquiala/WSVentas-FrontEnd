import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria';
import { Response } from './../interfaces/response';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl: string =  "https://localhost:7057/api/Categoria";

  constructor(private http: HttpClient) { }

  getCategorias():Observable<Response> {
    return this.http.get<Response>(this.apiUrl)
  }

  addCategoria(categoria: Categoria): Observable<Response> {
    return this.http.post<Response>(this.apiUrl, categoria, httpOption);
  }

  editCategoria(categoria: Categoria): Observable<Response> {
    return this.http.put<Response>(this.apiUrl, categoria, httpOption);
  }

  delCategoria(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.apiUrl}?IdCategoria=${id}`);
  }
}
