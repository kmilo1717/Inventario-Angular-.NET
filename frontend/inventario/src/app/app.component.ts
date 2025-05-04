import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.services';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isAthenticated: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.authenticated$.subscribe(authenticated => this.isAthenticated = authenticated);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
