import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MakeReservationService {
  constructor(private http: HttpClient) {}
}
