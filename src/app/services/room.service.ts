import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../interfaces/Room';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bloc } from '../interfaces/Bloc';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}
  getRooms(): Observable<Room[]> {
    const url = `${this.apiUrl}rooms`;
    return this.http.get<Room[]>(url);
  }

  putRoom(room: Room): Observable<Room> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Room>(`${this.apiUrl}room`, room, { headers });
  }
  getRoomsByBlocId(bloc: Bloc): Observable<Room[]> {
    const url = `${this.apiUrl}rooms/bloc/${bloc.id}`;
        return this.http.get<Room[]>(url);
  }
}
