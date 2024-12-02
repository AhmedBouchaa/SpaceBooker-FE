import { Admin } from './../../../interfaces/Admin';
import { BlocService } from './../../../services/bloc.service';
import { Bloc } from './../../../interfaces/Bloc';
import { RoomService } from './../../../services/room.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // For ngModel binding
import { CommonModule } from '@angular/common';
import { Reservation } from '../../../interfaces/Reservation';
import { Room } from '../../../interfaces/Room';
import internal from 'stream';
import { ReservationService } from '../../../services/reservation.service';
import { error } from 'console';
import { AddeventComponent } from '../../event/addevent/addevent.component';
import { EventService } from '../../../services/event.service';
import { AnEvent } from '../../../interfaces/Event';
import { format } from 'date-fns';

interface RoomWithStatus {
  room: Room;
  status: 'available' | 'occupied';
}

@Component({
  selector: 'app-make-reservation',
  standalone: true,
  imports: [FormsModule, CommonModule, AddeventComponent], // Import necessary modules
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.css'], // Corrected to 'styleUrls'
})
export class MakeReservationComponent implements OnInit {
  showModal: boolean = false;
  showModalAddRoom: boolean = false;
  showModalAddEvent: boolean = false;
  showEvents: boolean = false;
  theDate: string = '';
  fromTime: string = '';
  toTime: string = '';
  Bloc1: { room: Room; status: string }[] = [];
  Bloc2: { room: Room; status: string }[] = [];
  Bloc3: { room: Room; status: string }[] = [];
  Bloc4: { room: Room; status: string }[] = [];
  Bloc5: { room: Room; status: string }[] = [];
  Bloc6: { room: Room; status: string }[] = [];
  Bloc7: { room: Room; status: string }[] = [];
  Bloc8: { room: Room; status: string }[] = [];
  reservations: Reservation[] = [];
  AllRooms: Room[] = [];
  Rooms: Room[] = [];
  Events: AnEvent[] = [];
  CurrentBloc: Bloc = {
    id: 0,
    title: '',
    rooms: null,
  };
  Bloc_id: number = 0;
  Admin_id: number = 1;
  ChosenRoom: Room = {
    id: 0,
    name: '',
    num: 0,
    description: '',
    type: '',
    capacite: 0,
    img: '',
    reservations: [],
    bloc: null,
    bloc_id: null,
    admin_id: null,
    admin: null,
  };
  newRoom: Room = {
    id: 0,
    name: '',
    num: 0,
    description: '',
    type: '',
    capacite: 0,
    img: '',
    reservations: [],
    bloc: null,
    bloc_id: null,
    admin_id: null,
    admin: null,
  };
  newReservation: Reservation = {
    id: 0,
    start_time: '',
    end_time: '',
    state: '',
    event_id: null,
    reserver_id: null,
    room_id: null,
  };
  blocOccupancy = {
    bloc1: 0,
    bloc2: 0,
    bloc3: 0,
    bloc4: 0,
    bloc5: 0,
    bloc6: 0,
    bloc7: 0,
    bloc8: 0,
  };
  blocCountRoom = {
    bloc1: 0,
    bloc2: 0,
    bloc3: 0,
    bloc4: 0,
    bloc5: 0,
    bloc6: 0,
    bloc7: 0,
    bloc8: 0,
  };
  blocBackground = {
    bloc1: '',
    bloc2: '',
    bloc3: '',
    bloc4: '',
    bloc5: '',
    bloc6: '',
    bloc7: '',
    bloc8: '',
  };
  constructor(
    private reservationService: ReservationService,
    private roomService: RoomService,
    private blocService: BlocService,
    private eventService: EventService
  ) {}

  StartEverything(): void {
    this.loadReservations();
    this.FillBlocsData();
  }
  ngOnInit(): void {
    const now = new Date();
    this.theDate = now.toISOString().split('T')[0]; // Get the current date in yyyy-MM-dd format
    this.fromTime = now.toTimeString().split(':').slice(0, 2).join(':'); // Get the current time in HH:mm format
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
    this.toTime = oneHourLater.toTimeString().split(':').slice(0, 2).join(':'); // Get the time one hour later in HH:mm format

    this.newReservation.start_time = `${this.theDate}T${this.fromTime}:00`; // Example: 2024-12-02T16:31:12
    this.newReservation.end_time = `${this.theDate}T${this.toTime}:00`; // Example: 2024-12-02T17:31:12

    this.loadRooms();
    this.getEvents();
  }

  loadReservations(): void {
    if (this.theDate && this.fromTime && this.toTime) {
      this.reservationService
        .getReservationsByDateAndTime(this.theDate, this.fromTime, this.toTime)
        .subscribe(
          (data) => {
            this.reservations = data;
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
        console.error('Error fetching all rooms:', error);
      }
    );
  }

  loadRoomsByBlocId(): void {
    this.roomService.getRoomsByBlocId(this.Bloc_id).subscribe(
      (data) => {
        this.Rooms = data;
      },
      (error) => {
        console.error('Error fetching room for a bloc:', error);
      }
    );
  }

  getBloc(): void {
    this.blocService.getBlocById(this.Bloc_id).subscribe(
      (data) => {
        this.CurrentBloc = data;
      },
      (error) => {
        console.error('Error fetching room for a bloc:', error);
      }
    );
  }

  getEvents(): void {
    this.eventService.getEventByReserverId(1).subscribe(
      (data) => {
        this.Events = data;
      },
      (error) => {
        console.error('Error fetching events for a reserver:', error);
      }
    );
  }

  saveRoom(): void {
    this.roomService
      .AddRoom(this.newRoom, this.Admin_id, this.Bloc_id)
      .subscribe(
        (createdRoom) => {
          alert('Room created successfully!');
          this.closeModalAddRoom();
          this.loadRooms();
          var bloc_id = this.Bloc_id;
          this.closeModal();
          this.openModal(bloc_id);
        },
        (error) => {
          console.error('Error creating room:', error);
          alert(
            `Failed to create the room. ${error.message || error.error.message}`
          );
        }
      );
  }
  saveReservation(event_id: number): void {
    // Préparer les données pour la nouvelle réservation
    const startTime = `${this.theDate}T${this.fromTime}:00`;
    const endTime = `${this.theDate}T${this.toTime}:00`;

    // Vérifier que les dates sont valides
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const now = new Date();

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      alert('Les dates de début et de fin doivent être valides.');
      return;
    }

    // Vérifier que la date de début est dans le futur
    // if (startDate < now) {
    //   alert('La date de début doit être dans le futur.');
    //   return;
    // }

    // Vérifier que la date de fin est après la date de début
    if (endDate <= startDate) {
      alert("L'heure de fin doit être après l'heure de début.");
      return;
    }

    // Vérifier la durée maximale (8 heures)
    const durationHours =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    if (durationHours > 8) {
      alert('La durée de réservation ne peut pas dépasser 8 heures.');
      return;
    }

    this.newReservation.start_time = startTime;
    this.newReservation.end_time = endTime;
    this.newReservation.state = 'encours';

    // Vérifier les champs nécessaires
    if (
      !this.ChosenRoom.id ||
      !this.newReservation.start_time ||
      !this.newReservation.end_time ||
      !event_id
    ) {
      alert('Veuillez remplir tous les champs nécessaires avant de procéder.');
      return;
    }

    // Vérification des doublons avant la création
    this.reservationService
      .checkForDuplicateReservation(
        this.ChosenRoom.id,
        this.newReservation.start_time,
        this.newReservation.end_time
      )
      .subscribe({
        next: (isAvailable: boolean) => {
          if (!isAvailable) {
            alert(
              'Une réservation existe déjà pour cette salle et cette période.'
            );
            return;
          }

          // Si aucune réservation en double, procéder à la création
          this.reservationService
            .AddReservation(
              this.newReservation,
              2,
              event_id,
              this.ChosenRoom.id
            )
            .subscribe({
              next: (createdReservation) => {
                alert('Réservation créée avec succès !');
                this.loadReservations();
                this.closeModal();
              },
              error: (error) => {
                console.error(
                  'Erreur lors de la création de la réservation :',
                  error
                );
                alert(
                  `Impossible de créer la réservation. ${
                    error.message ||
                    error.error?.message ||
                    'Veuillez réessayer plus tard.'
                  }`
                );
              },
            });
        },
        error: (error) => {
          console.error('Erreur lors de la vérification des doublons :', error);
          alert(
            'Une erreur est survenue lors de la vérification des réservations existantes.'
          );
        },
      });
  }

  ChooseRoom(num: number): void {
    const room = this.AllRooms.find((res) => res.id === num);
    if (room) {
      this.ChosenRoom = room;
    } else {
      this.makeChosenRoomEmpty();
    }
  }

  openEvents(): void {
    if (this.showEvents) this.showEvents = false;
    else {
      this.showEvents = true;
    }
  }
  openModal(param: number): void {
    this.Bloc_id = param;
    this.loadRoomsByBlocId();
    this.getBloc();
    this.showModal = true;
  }

  closeModal(): void {
    this.Bloc_id = 0;
    this.Rooms = [];
    this.makeChosenRoomEmpty();
    this.showModal = false;
    this.showModalAddEvent = false;
  }

  openModalAddRoom(): void {
    this.newRoom.bloc_id = this.Bloc_id;
    this.showModalAddRoom = true;
  }

  closeModalAddRoom(): void {
    this.showModalAddRoom = false;
    this.newRoom = {
      id: 0,
      name: '',
      num: 0,
      description: '',
      type: '',
      capacite: 0,
      img: '',
      reservations: [],
      bloc: null,
      bloc_id: 0,
      admin_id: this.Admin_id,
      admin: null,
    };
  }
  openModalAddEvent() {
    this.showModalAddEvent = true;
  }

  closeModalAddEvent() {
    this.getEvents();
    this.showModalAddEvent = false;
  }

  makeChosenRoomEmpty(): void {
    this.ChosenRoom = {
      id: 0,
      name: '',
      num: 0,
      description: '',
      type: '',
      capacite: 0,
      img: '',
      reservations: [],
      bloc: null,
      bloc_id: null,
      admin_id: null,
      admin: null,
    };
  }
  makeNewReservationEmpty(): void {
    // Reset reservation object
    this.newReservation = {
      id: 0,
      start_time: '',
      end_time: '',
      state: '',
      event_id: null,
      reserver_id: null,
      room_id: null,
    };
  }
  FillBlocsData(): void {
    this.Bloc1 = [];
    this.Bloc2 = [];
    this.Bloc3 = [];
    this.Bloc4 = [];
    this.Bloc5 = [];
    this.Bloc6 = [];
    this.Bloc7 = [];
    this.Bloc8 = [];

    this.blocOccupancy = {
      bloc1: 0,
      bloc2: 0,
      bloc3: 0,
      bloc4: 0,
      bloc5: 0,
      bloc6: 0,
      bloc7: 0,
      bloc8: 0,
    };
    this.blocCountRoom = {
      bloc1: 0,
      bloc2: 0,
      bloc3: 0,
      bloc4: 0,
      bloc5: 0,
      bloc6: 0,
      bloc7: 0,
      bloc8: 0,
    };
    this.blocBackground = {
      bloc1: '',
      bloc2: '',
      bloc3: '',
      bloc4: '',
      bloc5: '',
      bloc6: '',
      bloc7: '',
      bloc8: '',
    };
    for (let i = 0; i < this.AllRooms.length; i++) {
      const room = this.AllRooms[i];
      const reservation = this.reservations.find(
        (res) => res.room?.id === room.id
      );
      const roomWithStatus: { room: Room; status: string } = {
        room: room,
        status: reservation ? 'occupied' : 'available',
      };

      switch (room.bloc?.id) {
        case 1:
          this.Bloc1.push(roomWithStatus);
          this.blocCountRoom.bloc1++;
          if (reservation) this.blocOccupancy.bloc1++;
          break;
        case 2:
          this.Bloc2.push(roomWithStatus);
          this.blocCountRoom.bloc2++;
          if (reservation) this.blocOccupancy.bloc2++;
          break;
        case 3:
          this.Bloc3.push(roomWithStatus);
          this.blocCountRoom.bloc3++;
          if (reservation) this.blocOccupancy.bloc3++;
          break;
        case 4:
          this.Bloc4.push(roomWithStatus);
          this.blocCountRoom.bloc4++;
          if (reservation) this.blocOccupancy.bloc4++;
          break;
        case 5:
          this.Bloc5.push(roomWithStatus);
          this.blocCountRoom.bloc5++;
          if (reservation) this.blocOccupancy.bloc5++;
          break;
        case 6:
          this.Bloc6.push(roomWithStatus);
          this.blocCountRoom.bloc6++;
          if (reservation) this.blocOccupancy.bloc6++;
          break;
        case 7:
          this.Bloc7.push(roomWithStatus);
          this.blocCountRoom.bloc7++;
          if (reservation) this.blocOccupancy.bloc7++;
          break;
        case 8:
          this.Bloc8.push(roomWithStatus);
          this.blocCountRoom.bloc8++;
          if (reservation) this.blocOccupancy.bloc8++;
          break;
      }
    }

    // Calculate background colors based on occupancy percentage
    for (let i = 1; i <= 8; i++) {
      const blocKey = `bloc${i}` as keyof typeof this.blocOccupancy;
      const occupancy = this.blocOccupancy[blocKey];
      const totalRooms = this.blocCountRoom[blocKey];

      if (totalRooms > 0) {
        const occupancyPercentage = (occupancy / totalRooms) * 100;

        if (occupancyPercentage >= 100) {
          this.blocBackground[blocKey] = '#FECBCA'; // 100% Full - Light Red
        } else if (occupancyPercentage >= 50) {
          this.blocBackground[blocKey] = '#fed8ab'; // 50% Full - Light Orange
        } else if (occupancyPercentage >= 25) {
          this.blocBackground[blocKey] = '#fef189'; // 25% Full - Light Yellow
        } else {
          this.blocBackground[blocKey] = '#bbf7d1'; // Empty - Light Green
        }
      } else {
        this.blocBackground[blocKey] = '#E5E7EB55'; // Empty - Light Gray
      }
    }
  }
}
