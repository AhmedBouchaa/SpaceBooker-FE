import { Reservation } from './Reservation';
import { Bloc } from './Bloc';
import { Admin } from './Admin';

export interface Room {
  id: number; // Room ID
  name: string; // Name of the room
  num: number; // Room number
  description: string; // Description of the room
  type: string; // Type of the room
  capacite: number; // Capacity of the room
  img: string; // Image URL or path
  bloc?: Bloc | null;
  bloc_id: number | null;
  admin?: Admin | null; // Many-to-One relationship with Admin
  admin_id: number | null;
  reservations?: Reservation[]; // One-to-Many relationship with Reservation
}
