
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { InventarioComponent } from './productos/inventario/inventario.component';
import { MovimientoComponent } from './productos/movimiento/movimiento.component';
import { AuthGuard } from './core/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'productos',
    canActivate: [AuthGuard],
    children: [
      { path: 'inventario', component: InventarioComponent },
      { path: 'movimiento', component: MovimientoComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
