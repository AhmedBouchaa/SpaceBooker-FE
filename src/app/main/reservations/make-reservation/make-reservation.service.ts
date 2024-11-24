import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../../../interfaces/Reservation';

@Injectable({
  providedIn: 'root',
})
export class MakeReservationService {
  private apiUrl = 'http://localhost:8080/reservation';
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
    const url = `${this.apiUrl}/in/${formattedDate}/from/${startTime}/to/${endTime}`;
    return this.http.get<Reservation[]>(url);
  }
}
