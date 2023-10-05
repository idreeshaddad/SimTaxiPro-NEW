import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/cars/car.model';
import { CarDetails } from '../models/cars/carDetails.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl: string = "https://localhost:7138/api/Cars";

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {

    return this.http.get<Car[]>(`${this.apiUrl}/GetCars`);
  }

  getCar(id: number): Observable<CarDetails> {

    return this.http.get<CarDetails>(`${this.apiUrl}/GetCar/${id}`)
  }

  deleteCar(id: number): Observable<any> {

    return this.http.delete(`${this.apiUrl}/DeleteCar/${id}`);
  }
}
