import { Component, OnInit } from '@angular/core';
import { DriverList } from '../models/drivers/driverList.model';
import { DriverService } from '../services/driver.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  drivers: DriverList[] = [];
  showLoader: boolean = true;

  constructor(private driverSvc: DriverService) { }

  ngOnInit(): void {

    this.driverSvc.getDrivers().subscribe({
      next: (driverListArrayFromApi: DriverList[]) => {
        this.drivers = driverListArrayFromApi;
        this.showLoader = false;
      },
      error: (err: HttpErrorResponse) => {
        alert(err);
      }
    });
  }

}
