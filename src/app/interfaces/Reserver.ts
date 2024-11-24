import { Reservation } from './Reservation';

export interface Reserver {
  id: number;
  name: string;
  email: string;
  reservations: Reservation[];
}
