import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Room } from '../interfaces/Room';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Bloc } from '../interfaces/Bloc';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}
  getRooms(): Observable<Room[]> {
    const url = `${this.apiUrl}rooms`;
    return this.http.get<Room[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching rooms:', error);
        return throwError(() => new Error('Failed to fetch rooms.'));
      })
    );
  }

  AddRoom(room: Room, admin_id: number, bloc_id: number): Observable<Room> {
    // Create HttpParams to append bloc_id as a query parameter
    const params = new HttpParams()
      .set('bloc_id', bloc_id.toString())
      .set('admin_id', admin_id.toString());

    // Use PUT method to update the room, passing the room object and bloc_id as query parameter
    return this.http.post<Room>(`${this.apiUrl}rooms`, room, { params });
  }
  DeleteRoom(roomId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}rooms/${roomId}`).pipe(
      catchError((error) => {
        console.error('Error deleting room:', error);
        return throwError(() => new Error('Failed to delete room.'));
      })
    );
  }

  UpdateRoom(room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}rooms`, room);
  }
  getRoomsByBlocId(bloc_id: number): Observable<Room[]> {
    const url = `${this.apiUrl}rooms/bloc/${bloc_id}`;
    return this.http.get<Room[]>(url);
  }
}
