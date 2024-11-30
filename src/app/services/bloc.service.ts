import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bloc } from '../interfaces/Bloc';

@Injectable({
  providedIn: 'root',
})
export class BlocService {
  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}
  getBlocById(bloc_id: number): Observable<Bloc> {
    const url = `${this.apiUrl}bloc/${bloc_id}`;
    return this.http.get<Bloc>(url);
  }
}
