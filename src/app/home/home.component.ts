import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) { }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  navigateToDashboard() {
    this.router.navigate(['/Main']); // Redirige vers le composant Main
  }
}
