import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnEvent } from '../interfaces/Event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}
  AddEvent(
    event: AnEvent,
    reservation_id: number,
    reserver_id: number
  ): Observable<AnEvent> {
    // Créer HttpParams pour ajouter reservation_id et reserver_id
    const params = new HttpParams()
      .set('reservation_id', reservation_id.toString())
      .set('reserver_id', reserver_id.toString());
    // S'assurer que vous envoyez l'objet event comme corps de la requête
    return this.http.post<AnEvent>(`${this.apiUrl}events`, event, { params });
  }
  getEventByReserverId(reserver_id: number): Observable<AnEvent[]> {
    const url = `${this.apiUrl}events/of/${reserver_id}`;
    return this.http.get<AnEvent[]>(url);
  }
}
