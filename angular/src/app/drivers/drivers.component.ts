import { Component, OnInit } from '@angular/core';
import { DriverService } from '../services/driver.service';
import { DriverList } from '../models/drivers/driverList.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  drivers: DriverList[] = [];

  constructor(private driverSvc: DriverService) { }

  ngOnInit(): void {

    // This executes when the DriverComponent is initalized and ready to rumble!
    this.driverSvc.getDrivers().subscribe({
      next: (driversFromApi: DriverList[]) => {
        this.drivers = driversFromApi;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }


}
