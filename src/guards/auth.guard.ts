import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Récupérer le token du local storage

    if (token && this.authService.isAuthenticated()) {
      return true; // L'utilisateur est authentifié, accès accordé
    }
    this.router.navigate(['/login']); // Redirection vers la page de connexion
    return false; // L'utilisateur n'est pas authentifié, accès refusé
  }
}
