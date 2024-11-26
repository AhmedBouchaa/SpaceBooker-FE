import { Event } from './Event'; // Import the Event interface
import { Reserver } from './Reserver'; // Import the Reserver interface
import { Room } from './Room'; // Import the Room interface

export interface Reservation {
  id: number; // Reservation ID
  date: string; // Date of reservation (as an ISO string for LocalDateTime)
  startTime: string; // Start time (as an ISO string for LocalTime)
  endTime: string; // End time (as an ISO string for LocalTime)
  state: string; // State of the reservation (e.g., confirmed, pending)
  event?: Event; // Associated event (One-to-One relationship, optional)
  reserver: Reserver; // Reserver of the reservation (Many-to-One relationship)
  room: Room; // Room associated with the reservation (Many-to-One relationship)
}
