import { Reservation } from './Reservation'; // Import the Reservation interface
import { Reserver } from './Reserver'; // Import the Reserver interface

export interface Event {
  id: number; // Event ID
  name: string; // Name of the event
  description: string; // Description of the event
  img: string; // URL or path to the event's image
  reservation: Reservation; // The reservation associated with the event (One-to-One)
  reserver: Reserver; // The reserver associated with the event (Many-to-One)
}
