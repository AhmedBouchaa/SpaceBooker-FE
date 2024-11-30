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

  constructor(
    private reservationService: ReservationService,
    private roomService: RoomService,
    private blocService: BlocService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const now = new Date();
    this.theDate = now.toISOString().split('T')[0];
    this.fromTime = now.toTimeString().split(':').slice(0, 2).join(':');
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
    this.toTime = oneHourLater.toTimeString().split(':').slice(0, 2).join(':');
    this.loadReservations();
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

  ChooseRoom(num: number): void {
    const room = this.AllRooms.find((res) => res.id === num);
    if (room) {
      this.ChosenRoom = room;
    } else {
      this.makeChosenRoomEmpty();
    }
  }

  openEvents(): void {
    this.showEvents = true;
  }
  closeEvents(): void {
    this.showEvents = false;
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
    this.showModalAddEvent = false;
  }

  makeChosenRoomEmpty(): void {
    this.closeEvents();
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
  // FillBlocsData(): void {
  //   // Clear all bloc arrays and counters
  //   this.Bloc1 = [];
  //   this.Bloc2 = [];
  //   this.Bloc3 = [];
  //   this.Bloc4 = [];
  //   this.Bloc5 = [];
  //   this.Bloc6 = [];
  //   this.Bloc7 = [];
  //   this.Bloc8 = [];

  //   // Reset occupancy counters
  //   this.blocOccupancy = {
  //     bloc1: 0,
  //     bloc2: 0,
  //     bloc3: 0,
  //     bloc4: 0,
  //     bloc5: 0,
  //     bloc6: 0,
  //     bloc7: 0,
  //     bloc8: 0,
  //   };
  //   for (let i = 0; i < this.AllRooms.length; i++) {
  //     const room = this.AllRooms[i];
  //     const reservation = this.reservations.find(
  //       (res) => res.room?.id === room.id
  //     );
  //     const roomWithStatus: { room: Room; status: string } = {
  //       room: room,
  //       status: reservation ? 'occupied' : 'available',
  //     };

  //     switch (room.bloc?.id) {
  //       case 1:
  //         this.Bloc1.push(roomWithStatus);
  //         if (reservation) this.blocOccupancy.bloc1++;
  //         break;
  //       case 2:
  //         this.Bloc2.push(roomWithStatus);
  //         if (reservation) this.blocOccupancy.bloc2++;
  //         break;
  //       case 3:
  //         this.Bloc3.push(roomWithStatus);
  //         if (reservation) this.blocOccupancy.bloc3++;
  //         break;
  //       case 4:
  //         this.Bloc4.push(roomWithStatus);
  //         if (reservation) this.blocOccupancy.bloc4++;
  //         break;
  //       case 5:
  //         this.Bloc5.push(roomWithStatus);
  //         if (reservation) this.blocOccupancy.bloc5++;
  //         break;
  //       case 6:
  //         this.Bloc6.push(roomWithStatus);
  //         if (reservation) this.blocOccupancy.bloc6++;
  //         break;
  //       case 7:
  //         this.Bloc7.push(roomWithStatus);
  //         if (reservation) this.blocOccupancy.bloc7++;
  //         break;
  //       case 8:
  //         this.Bloc8.push(roomWithStatus);
  //         if (reservation) this.blocOccupancy.bloc8++;
  //         break;
  //     }
  //   }
  // console.log('Bloc 1 Rooms:', this.Bloc1.map(item => ({
  //   roomName: item.room.name,
  //   status: item.status
  // })));
  // console.log('Occupancy counts:', this.blocOccupancy);
  //}
}
// console.log(
//   'Reservations:',
//   this.reservations.map((item) => ({
//     id: item.id,
//     date: item.date,
//     startTime: item.startTime || 'undefined',
//     endTime: item.endTime || 'undefined',
//     state: item.state,
//     room_id: item.room?.id,
//     room_name: item.room?.name,
//     reserver_id: item.reserver?.id,
//     reserver_name: item.reserver?.name,
//     event_id: item.event?.id,
//   }))
// );
