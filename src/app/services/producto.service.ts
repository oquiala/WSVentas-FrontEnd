import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';
import { Response } from './../interfaces/response';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl: string =  "https://localhost:7057/api/Producto";

  constructor(private http: HttpClient) { }

  getProductos():Observable<Response> {
    return this.http.get<Response>(this.apiUrl)
  }

  addProducto(prod: Producto): Observable<Response> {
    return this.http.post<Response>(this.apiUrl, prod, httpOption);
  }

  editProducto(prod: Producto): Observable<Response> {
    return this.http.put<Response>(this.apiUrl, prod, httpOption);
  }

  delProducto(id: number): Observable<Response> {
    console.log(id)
    return this.http.delete<Response>(`${this.apiUrl}?IdProducto=${id}`);
  }

}
