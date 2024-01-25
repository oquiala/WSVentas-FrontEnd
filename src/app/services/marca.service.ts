import { Response } from './../interfaces/response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marca } from '../interfaces/marca';
import { Observable } from 'rxjs';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private apiUrl: string =  "https://localhost:7057/api/Marca";

  constructor(private http: HttpClient) { }

  getMarcas():Observable<Response> {
    return this.http.get<Response>(this.apiUrl)
  }

  addMarca(marca: Marca): Observable<Response> {
    return this.http.post<Response>(this.apiUrl, marca, httpOption);
  }

  editMarca(marca: Marca): Observable<Response> {
    return this.http.put<Response>(this.apiUrl, marca, httpOption);
  }

  delMarca(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.apiUrl}?IdMarca=${id}`);
  }

}
