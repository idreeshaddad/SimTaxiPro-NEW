import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Passenger } from '../models/passengers/passenger.model';
import { PassengerDetails } from '../models/passengers/passengerDetails.model';
import { CreateUpdatePassenger } from '../models/passengers/createUpdatePassenger.model';
import { Lookup } from '../models/lookup.model';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  private apiUrl: string = 'https://localhost:7138/api/Passengers';

  constructor(private http: HttpClient) { }

  getPassengers(): Observable<Passenger[]> {

    return this.http.get<Passenger[]>(`${this.apiUrl}/GetPassengers`);
  }

  getPassenger(id: number): Observable<PassengerDetails> {

    return this.http.get<PassengerDetails>(`${this.apiUrl}/GetPassenger/${id}`);
  }

  createPassenger(passenger: CreateUpdatePassenger): Observable<any> {

    return this.http.post(`${this.apiUrl}/CreatePassenger`, passenger);
  }

  getPassengerForEdit(id: number): Observable<CreateUpdatePassenger> {

    return this.http.get<CreateUpdatePassenger>(`${this.apiUrl}/GetPassengerForEdit/${id}`);
  }

  editPassenger(id: number, passenger: CreateUpdatePassenger): Observable<any> {

    return this.http.put(`${this.apiUrl}/EditPassenger/${id}`, passenger);
  }

  deletePassenger(id: number): Observable<any> {

    return this.http.delete(`${this.apiUrl}/DeletePassenger/${id}`);
  }

  getPassengersLookup(): Observable<Lookup[]> {

    return this.http.get<Lookup[]>(`${this.apiUrl}/GetPassengersLookup`);
  }
}
