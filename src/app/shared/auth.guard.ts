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

  canActivate(): boolean {
    if (this.authService.loggedIn()) return true;

    this.router.navigate(['/login']);
    return false;
  }

  canLoad(): boolean {
    if (this.authService.loggedIn()) return true;

    this.router.navigate(['/login']);
    return false;
  }
}
