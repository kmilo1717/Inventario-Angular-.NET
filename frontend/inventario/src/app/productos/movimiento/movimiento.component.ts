import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InventarioService } from 'src/app/services/inventario.service';
import { Producto } from 'src/app/productos/models/producto.model';
import { Movimiento } from 'src/app/productos/models/movimiento.model';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.scss']
})
export class MovimientoComponent implements OnInit {
  movimientoForm!: FormGroup;
  productosDisponibles: Producto[] = [];
  esNuevoProducto: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private inventarioService: InventarioService
  ) { }

  ngOnInit() {
    this.movimientoForm = this.fb.group({
      esNuevoProducto: [false],
      tipo: ['', Validators.required],
      productoId: [null],
      nombre: [''],
      cantidad: [1, [Validators.required, Validators.min(1)]],
    });

    this.movimientoForm.get('esNuevoProducto')?.valueChanges.subscribe((isNew: boolean) => {
      if (isNew) {
        this.movimientoForm.get('tipo')?.setValue('entrada');
        this.movimientoForm.get('productoId')?.clearValidators();
        this.movimientoForm.get('nombre')?.setValidators([Validators.required]);
        this.movimientoForm.get('tipo')?.clearValidators();
      } else {
        this.movimientoForm.get('tipo')?.setValidators([Validators.required]);
        this.movimientoForm.get('productoId')?.setValidators([Validators.required]);
        this.movimientoForm.get('nombre')?.clearValidators();
        this.movimientoForm.get('tipo')?.setValue('');
      }

      this.movimientoForm.get('tipo')?.updateValueAndValidity();
      this.movimientoForm.get('productoId')?.updateValueAndValidity();
      this.movimientoForm.get('nombre')?.updateValueAndValidity();
    });

    this.inventarioService.getProductos().subscribe(productos => {
      this.productosDisponibles = productos;
    });
  }

  registrarMovimiento() {
    if (this.movimientoForm.invalid) {
      this.toastr.error('Completa todos los campos requeridos.');
      return;
    }

    const form = this.movimientoForm.value;

    if (form.esNuevoProducto) {
      if (!this.nombre?.valid) {
        this.toastr.error('El nombre del nuevo producto es obligatorio.');
        return;
      }
    } else {
      if (!this.productoId?.valid) {
        this.toastr.error('Debe seleccionar un producto existente.');
        return;
      }

      if (form.tipo === 'salida' && !this.validarStockDisponible(form.productoId, form.cantidad)) {
        this.toastr.error('No hay suficiente stock disponible. Disponible: ' + this.productosDisponibles.find(p => p.id == form.productoId)?.cantidad);
        return;
      }
    }

    if (form.cantidad.toString().length > 10) {
      this.toastr.error('La cantidad no puede tener más de 10 caracteres.');
      return;
    }

    const producto: Producto = {
      cantidad: form.cantidad,
      nombre: form.esNuevoProducto ? form.nombre : undefined,
      id: !form.esNuevoProducto ? form.productoId : undefined
    };

    const movimiento: Movimiento = {
      tipo: form.tipo,
      producto
    };

    this.inventarioService.registrarMovimiento(movimiento).subscribe({
      next: () => {
        this.toastr.success('Movimiento registrado exitosamente');
        this.router.navigate(['/productos/inventario']);
      },
      error: (e) => {
        console.error(e);
        this.toastr.error('Error al registrar movimiento');
      }
    });
  }

  cancelarMovimiento() {
    this.router.navigate(['/productos/inventario']);
  }

  private validarStockDisponible(productoId: number, cantidad: number): boolean {
    const producto = this.productosDisponibles.find(p => p.id == productoId);
    if (!producto) {
      this.toastr.error('Producto no encontrado.');
      return false;
    }

    if (cantidad > producto.cantidad) {
      this.toastr.error(`No hay suficiente stock disponible. Disponible: ${producto.cantidad}`);
      return false;
    }

    return true;
  }

  get tipo() {
    return this.movimientoForm.get('tipo');
  }

  get productoId() {
    return this.movimientoForm.get('productoId');
  }

  get nombre() {
    return this.movimientoForm.get('nombre');
  }

  get cantidad() {
    return this.movimientoForm.get('cantidad');
  }
}
