import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  checkLoggedIn(): boolean {
    if (this.authService.loggedIn()) return true;

    this.router.navigate(['/login']);
    return false;
  }

  canActivate(): boolean {
    return this.checkLoggedIn();
  }

  canLoad(): boolean {
    return this.checkLoggedIn();
  }
}
