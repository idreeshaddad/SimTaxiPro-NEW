import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DriverList } from '../models/drivers/driverList.model';
import { DriverDetails } from '../models/drivers/driverDetails.model';
import { CreateUpdateDriver } from '../models/drivers/createUpdateDriver.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  apiUrl: string = 'https://localhost:7138/api/Drivers';

  constructor(private http: HttpClient) { }

  getDrivers(): Observable<DriverList[]> {

    return this.http.get<DriverList[]>(`${this.apiUrl}/GetDrivers`);
  }

  getDriver(id: number): Observable<DriverDetails> {

    return this.http.get<DriverDetails>(`${this.apiUrl}/GetDriver/${id}`);
  }

  createDriver(driver: CreateUpdateDriver): Observable<any> {

    return this.http.post<CreateUpdateDriver>(`${this.apiUrl}/CreateDriver`, driver);
  }
}
