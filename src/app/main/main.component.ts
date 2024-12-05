import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NavComponent } from './nav/nav.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReservationsComponent } from './reservations/reservations.component';
import { EventComponent } from './event/event.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    SidenavComponent,
    NavComponent,
    ReservationsComponent,
    RouterOutlet,
    RouterModule,
    EventComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate([HomeComponent]); // Redirige vers Home si non connecté
    }
  }
}
