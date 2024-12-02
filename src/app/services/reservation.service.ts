import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../interfaces/Reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  /**
   * Check for duplicate reservation based room_id, and date.
   * @param room_id - The ID of the room.
   * @param date - The start time of the reservation (in 'HH:mm' format).
   * @returns Observable of the check result, typically a message or status.
   */
  checkForDuplicateReservation(
    room_id: number,
    start_time: string,
    end_time: string
  ): Observable<boolean> {
    // Construct the URL for checking duplicates
    const url = `${this.apiUrl}reservation/check`;
    // Construct HttpParams to include event_id, room_id, and date as query parameters
    console.log(start_time);
    const params = new HttpParams()
      .set('roomId', room_id.toString())
      .set('start_time', start_time)
      .set('end_time', end_time);
    // Send GET request to the backend to check for duplicates
    return this.http.get<boolean>(url, { params });
  }

  /**
   * Fetch reservations by date and time range.
   * @param date - The date for the reservations (in 'yyyy-MM-dd' format).
   * @param startTime - The start time (in 'HH:mm' format).
   * @param endTime - The end time (in 'HH:mm' format).
   * @returns Observable of the list of reservations.
   */
  getReservationsByDateAndTime(
    date: string,
    startTime: string,
    endTime: string
  ): Observable<Reservation[]> {
    const start_time = `${date}T${startTime}:00`; // Example: 2024-12-02T16:31:12
    const end_time = `${date}T${endTime}:00`; // Example: 2024-12-02T17:31:12
    const url = `${this.apiUrl}reservation/from/${start_time}/to/${end_time}`;
    return this.http.get<Reservation[]>(url);
  }

  /**
   * Add a new reservation.
   * @param reservation - The reservation object.
   * @param reserver_id - The ID of the reserver.
   * @param event_id - The ID of the event.
   * @param room_id - The ID of the room.
   * @returns Observable of the created reservation.
   */
  AddReservation(
    reservation: Reservation,
    reserver_id: number,
    event_id: number,
    room_id: number
  ): Observable<Reservation> {
    // Create HttpParams to append reserver_id, event_id, and room_id as query parameters
    const params = new HttpParams()
      .set('reserver_id', reserver_id.toString())
      .set('event_id', event_id.toString())
      .set('room_id', room_id.toString());

    // Use POST method to add a new reservation
    return this.http.post<Reservation>(
      `${this.apiUrl}reservation`,
      reservation,
      { params }
    );
  }
}
