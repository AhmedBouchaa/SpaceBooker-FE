import { RoomService } from './../../../services/room.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // For ngModel binding
import { CommonModule } from '@angular/common';
import { Reservation } from '../../../interfaces/Reservation';
import { Room } from '../../../interfaces/Room';
import internal from 'stream';
import { ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'app-make-reservation',
  standalone: true,
  imports: [FormsModule, CommonModule], // Import necessary modules
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.css'], // Corrected to 'styleUrls'
})
export class MakeReservationComponent implements OnInit {
  showModal: boolean = false;
  showModalAddRoom: boolean = false;
  currentDate: string = '';
  fromTime: string = '';
  toTime: string = '';
  reservations: Reservation[] = []; // Store fetched reservations
  AllRooms: Room[] = [];
  Bloc_id: number = 0;
  newRoom: Room = {
    name: '',
    num: 0,
    description: '',
    type: '',
    capacite: 0,
    img: '',
    reservations: [],
    bloc: null,
    admin: null,
  };

  constructor(
    private reservationService: ReservationService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    const now = new Date();
    // Initialize current date
    this.currentDate = now.toISOString().split('T')[0];
    // Initialize times
    this.fromTime = now.toTimeString().split(':').slice(0, 2).join(':');
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
    this.toTime = oneHourLater.toTimeString().split(':').slice(0, 2).join(':');
    this.loadRooms();
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

  loadRooms(): void {
    this.roomService.getRooms().subscribe(
      (data) => {
        this.AllRooms = data;
      },
      (error) => {
        console.error('Error fetching reservations:', error);
      }
    );
  }

  saveRoom(): void {
    this.roomService.putRoom(this.newRoom).subscribe(
      (createdRoom) => {
        console.log('Room created successfully:', createdRoom);
        alert('Room created successfully!');
      },
      (error) => {
        console.error('Error creating room:', error);
        alert('Failed to create the room.');
      }
    );
  }

  openModal(param: number): void {
    this.Bloc_id = param;
    this.showModal = true;
  }

  closeModal(): void {
    this.Bloc_id = 0;
    this.showModal = false;
  }

  openModalAddRoom(): void {
    this.showModalAddRoom = true;
  }
  closeModalAddRoom(): void {
    this.showModalAddRoom = false;
  }
}
