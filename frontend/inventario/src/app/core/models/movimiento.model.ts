
import { Producto } from './producto.model';

export interface Movimiento {
  tipo: string;
  producto: Producto;
}
