import { Component } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NavComponent } from './nav/nav.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReservationsComponent } from './reservations/reservations.component';
import { EventComponent } from './event/event.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SidenavComponent, NavComponent,ReservationsComponent,RouterOutlet,RouterModule,EventComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {}
