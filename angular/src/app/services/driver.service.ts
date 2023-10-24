import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Driver } from '../models/drivers/driver.model';
import { DriverDetails } from '../models/drivers/driverDetails.model';
import { CreateUpdateDriver } from '../models/drivers/createUpdateDriver.model';
import { Lookup } from '../models/lookup.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private apiUrl: string = 'https://localhost:7138/api/Drivers';

  constructor(private http: HttpClient) { }

  getDrivers(): Observable<Driver[]> {

    return this.http.get<Driver[]>(`${this.apiUrl}/GetDrivers`);
  }

  getDriver(id: number): Observable<DriverDetails> {

    return this.http.get<DriverDetails>(`${this.apiUrl}/GetDriver/${id}`);
  }

  createDriver(driver: CreateUpdateDriver): Observable<any> {

    return this.http.post<CreateUpdateDriver>(`${this.apiUrl}/CreateDriver`, driver);
  }

  getDriverForEdit(id: number): Observable<CreateUpdateDriver> {

    return this.http.get<CreateUpdateDriver>(`${this.apiUrl}/GetDriverForEdit/${id}`);
  }

  editDriver(id: number, driver: CreateUpdateDriver): Observable<any> {

    return this.http.put<CreateUpdateDriver>(`${this.apiUrl}/EditDriver/${id}`, driver);
  }

  deleteDriver(id: number): Observable<any> {

    return this.http.delete(`${this.apiUrl}/DeleteDriver/${id}`);
  }

  getDriversLookup(): Observable<Lookup[]> {

    return this.http.get<Lookup[]>(`${this.apiUrl}/GetDriversLookup`);
  }

  assignDriverCars(driverId: number, carsIds: number[]): Observable<any> {

    return this.http.post(`${this.apiUrl}/AssignDriverCars?driverId=${driverId}`, carsIds);
  }

  unassignDriverCar(driverId: number, carId: number): Observable<any> {

    return this.http.post(`${this.apiUrl}/UnassignCar?driverId=${driverId}&carId=${carId}`, null);
  }
}
