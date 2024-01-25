import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../interfaces/venta';
import { Response } from './../interfaces/response';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private apiUrl: string =  "https://localhost:7057/api/Venta";

  constructor(private http: HttpClient) {}

  addVenta(venta: Venta): Observable<Response> {
    return this.http.post<Response>(this.apiUrl, venta, httpOption);
  }

  getVentasHome():Observable<Response> {
    return this.http.get<Response>(this.apiUrl)
  }


}
