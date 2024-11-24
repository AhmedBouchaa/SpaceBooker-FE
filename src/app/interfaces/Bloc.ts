import { Room } from "./Room"; // Import the Room interface

export interface Bloc {
  id: number; // Bloc ID
  title: string; // Bloc title
  rooms: Room[]; // List of rooms in the bloc
}
