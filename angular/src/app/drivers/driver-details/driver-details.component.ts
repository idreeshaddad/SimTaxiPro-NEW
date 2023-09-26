import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DriverDetails } from 'src/app/models/drivers/driverDetails.model';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent implements OnInit {

  driver!: DriverDetails;

  constructor(private driverSvc: DriverService) { }

  ngOnInit(): void {

    this.driverSvc.getDriver(1).subscribe({
      next: (driverDetailsFromApi: DriverDetails) => {
        this.driver = driverDetailsFromApi;
      },
      error: (err: HttpErrorResponse) => {
        alert(err);
      }
    });
  }
}
