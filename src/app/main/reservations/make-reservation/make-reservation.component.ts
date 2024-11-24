import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // For ngModel binding
import { CommonModule } from '@angular/common';
import { Reservation } from '../../../interfaces/Reservation';
import { MakeReservationService } from './make-reservation.service';

@Component({
  selector: 'app-make-reservation',
  standalone: true,
  imports: [FormsModule, CommonModule], // Import necessary modules
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.css'], // Corrected to 'styleUrls'
})
export class MakeReservationComponent implements OnInit {
  currentDate: string = '';
  fromTime: string = '';
  toTime: string = '';
  reservations: Reservation[] = []; // Store fetched reservations

  constructor(private reservationService: MakeReservationService) {}

  ngOnInit(): void {
    const now = new Date();
    // Initialize current date
    this.currentDate = now.toISOString().split('T')[0];
    // Initialize times
    this.fromTime = now.toTimeString().split(':').slice(0, 2).join(':');
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
    this.toTime = oneHourLater.toTimeString().split(':').slice(0, 2).join(':');
    this.loadReservations();
  }
  loadReservations(): void {
    if (this.currentDate && this.fromTime && this.toTime) {
      this.reservationService
        .getReservationsByDateAndTime(
          this.currentDate,
          this.fromTime,
          this.toTime
        )
        .subscribe(
          (data) => {
            this.reservations = data;
            console.log('Fetched reservations:', this.reservations);
          },
          (error) => {
            console.error('Error fetching reservations:', error);
          }
        );
    } else {
      console.warn('Please ensure all date and time fields are filled.');
    }
  }
}
