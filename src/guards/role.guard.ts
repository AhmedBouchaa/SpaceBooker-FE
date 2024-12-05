// role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as string[];//récupérer les rôles
    const token = localStorage.getItem('token'); // Récupérer le token du local storage

    // Vérifier si l'utilisateur est authentifié et a les rôles requis
    if (token && this.authService.isAuthenticated() && this.authService.hasRole(requiredRoles)) {
      return true; // L'utilisateur est authentifié avec les rôles requis, accès accordé
    }
    return false; // L'utilisateur n'a pas les droits d'accès, accès refusé
  }
}
