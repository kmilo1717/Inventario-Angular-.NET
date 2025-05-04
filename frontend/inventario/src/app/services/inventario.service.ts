import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroments';
import { AuthService } from './auth.services';
import { Producto } from '../core/models/producto.model';
import { Movimiento } from '../core/models/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private apiUrl = `${environment.apiUrl}/productos`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl+'/inventario');
  }

  registrarMovimiento(movimiento: Movimiento): Observable<any> {
    return this.http.post(`${this.apiUrl}/movimiento`, movimiento);
  }

}
