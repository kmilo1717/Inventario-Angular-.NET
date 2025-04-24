import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Importar Reactive Forms

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  erroinlogin: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/productos/inventario']);
    }

    // Crear el formulario reactivo
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.erroinlogin = false;

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        next: (response: any) => {
          this.authService.setToken(response.token);
          this.toastr.success('Inicio de sesión exitoso');
          this.router.navigate(['/productos/inventario']);
        },
        error: (error: any) => {
          if (error.status === 401) {
            this.toastr.error('Credenciales incorrectas');
          } else {
            this.toastr.error('Error al iniciar sesión');
          }
          this.erroinlogin = true;
          this.loginForm.reset();
        }
      });
    } else {
      this.toastr.warning('Por favor ingrese un nombre de usuario y contraseña.', 'Advertencia');
    }
  }
}
