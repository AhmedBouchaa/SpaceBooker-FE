import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { ReservationsComponent } from './main/reservations/reservations.component';
import { MakeReservationComponent } from './main/reservations/make-reservation/make-reservation.component';
import { MyReservationsComponent } from './main/reservations/my-reservations/my-reservations.component';

export const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'Reservations',
        component: ReservationsComponent,
      },
    ],
  },
  {
    path: 'Reservations',
    component: ReservationsComponent,
    children: [
      { path: 'make-reservation', component: MakeReservationComponent },
      { path: 'my-reservations', component: MyReservationsComponent },
    ],
  },
];
@NgModule
  ({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutes{}
