import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../enviroments/enviroments';
import { jwtDecode } from 'jwt-decode';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticatedSubject = new BehaviorSubject<boolean>(false);
  public authenticated$ = this.authenticatedSubject.asObservable();
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}
  isLoggedIn(): boolean {
    return this.authenticatedSubject.getValue();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isExpiredToken(token: string) {
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.authenticatedSubject.next(true);
  }

  checkAuth(): Observable<boolean> {
    return this.http.get(`${this.apiUrl}/me`, { withCredentials: true }).pipe(
      map(() => {
        this.authenticatedSubject.next(true);
        return true;
      }),
      catchError(() => {
        this.authenticatedSubject.next(false);
        return of(false);
      })
    );
  }
  
  

  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { username, password }, { withCredentials: true });
  }

  logout() {
    localStorage.removeItem('token');
    this.authenticatedSubject.next(false);
  }
}
