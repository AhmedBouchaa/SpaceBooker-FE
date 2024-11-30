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
    const formattedDate = `${date}T00:00:00`; // Ensure LocalDateTime format
    const url = `${this.apiUrl}reservation/in/${formattedDate}/from/${startTime}/to/${endTime}`;
    return this.http.get<Reservation[]>(url);
  }
  AddReservation(
    reservation: Reservation,
    reserver_id: number,
    event_id: number,
    room_id: number
  ): Observable<Reservation> {
    // Create HttpParams to append bloc_id as a query parameter
    const params = new HttpParams()
      .set('reserver_id', reserver_id.toString())
      .set('event_id', event_id.toString())
      .set('room_id', room_id.toString());
    // Use PUT method to update the room, passing the room object and bloc_id as query parameter
    return this.http.post<Reservation>(
      `${this.apiUrl}reservation`,
      reservation,
      { params }
    );
  }
}
