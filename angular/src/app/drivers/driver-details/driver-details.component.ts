import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriverDetails } from 'src/app/models/drivers/driverDetails.model';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent implements OnInit {

  driver!: DriverDetails;
  driverId!: number;

  constructor(
    private driverSvc: DriverService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.getDriverIdFromUrl();

    this.driverSvc.getDriver(this.driverId).subscribe({
      next: (driverDetailsFromApi: DriverDetails) => {
        this.driver = driverDetailsFromApi;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }


  private getDriverIdFromUrl(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      let driverIdString = this.activatedRoute.snapshot.paramMap.get('id');
      this.driverId = Number(driverIdString);
    }
    else {
      alert("Please provide an ID in the URL.");
    }
  }
}
