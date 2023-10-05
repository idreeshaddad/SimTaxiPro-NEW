import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/cars/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl: string = "https://localhost:7138/api/Cars";

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {

    return this.http.get<Car[]>(`${this.apiUrl}/GetCars`);
  }
}
