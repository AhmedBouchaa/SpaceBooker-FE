import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NgModule, Component } from '@angular/core';
import { ReservationsComponent } from './main/reservations/reservations.component';
import { MakeReservationComponent } from './main/reservations/make-reservation/make-reservation.component';
import { MyReservationsComponent } from './main/reservations/my-reservations/my-reservations.component';
import { ProfileComponent } from './main/profile/profile.component';
import { EventComponent } from './main/event/event.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { SignInComponent } from './home/sign-in/sign-in.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'sign-in', component: SignInComponent },
    ],
  },
  {
    path: 'Main',
    component: MainComponent,
    children: [
      {
        path: 'Reservations',
        component: ReservationsComponent,
        children: [
          { path: 'make-reservation', component: MakeReservationComponent },
          { path: 'my-reservations', component: MyReservationsComponent },
        ],
      },
      {
        path: 'Profile',
        component: ProfileComponent,
      },
      {
        path: 'Event',
        component: EventComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutes {}
