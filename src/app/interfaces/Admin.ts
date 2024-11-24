import { User } from './User'; // Import the User interface
import { Room } from './Room'; // Import the Room interface

export interface Admin extends User {
  rooms: Room[]; // List of rooms managed by the admin
}
