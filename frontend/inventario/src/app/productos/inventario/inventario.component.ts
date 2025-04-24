import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.services';
import { Router } from '@angular/router';
import { InventarioService } from 'src/app/services/inventario.service';
import { Producto } from 'src/app/productos/models/producto.model';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent {

  productos: Producto[] = [];
  
  constructor(private authService: AuthService, private router: Router, private inventarioService: InventarioService) { }

  ngOnInit() {
    this.inventarioService.getProductos().subscribe(productos => {
      this.productos = productos.filter(p => p.cantidad > 0);
    });
  }
  
  registrarMovimiento() {
    this.router.navigate(['/productos/movimiento']);
  }

}
