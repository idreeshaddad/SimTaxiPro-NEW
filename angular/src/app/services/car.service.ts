import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/cars/car.model';
import { CarDetails } from '../models/cars/carDetails.model';
import { CreateUpdateCar } from '../models/cars/createUpdateCar.model';
import { Lookup } from '../models/lookup.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl: string = "https://localhost:7138/api/Cars";

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {

    return this.http.get<Car[]>(`${this.apiUrl}/GetCars`);
  }

  getCar(id: number): Observable<CarDetails> {

    return this.http.get<CarDetails>(`${this.apiUrl}/GetCar/${id}`)
  }

  createCar(car: CreateUpdateCar): Observable<any> {

    return this.http.post(`${this.apiUrl}/CreateCar`, car);
  }

  getCarForEdit(id: number): Observable<CreateUpdateCar> {

    return this.http.get<CreateUpdateCar>(`${this.apiUrl}/GetCarForEdit/${id}`);
  }

  editCar(id: number, car: CreateUpdateCar): Observable<any> {

    return this.http.put(`${this.apiUrl}/EditCar/${id}`, car);
  }

  deleteCar(id: number): Observable<any> {

    return this.http.delete(`${this.apiUrl}/DeleteCar/${id}`);
  }

  getCarsLookup(): Observable<Lookup[]> {

    return this.http.get<Lookup[]>(`${this.apiUrl}/GetCarsLookup`);
  }
}
