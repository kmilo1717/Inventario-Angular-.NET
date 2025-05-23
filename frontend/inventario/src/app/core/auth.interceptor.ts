import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { AuthService } from './../services/auth.services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        /* const token = this.authService.getToken();

        if (token) {

            if (this.authService.isExpiredToken(token)) {
                this.authService.logout();
                this.router.navigate(['/login']);
                this.toastr.error('Sesion expirada');
                return EMPTY;
            }
            
            const clonedRequest = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });

            return next.handle(clonedRequest);
        } */
        req = req.clone({ withCredentials: true });
        return next.handle(req);
    }
}
