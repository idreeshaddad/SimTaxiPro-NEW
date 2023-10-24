import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/app/models/cars/car.model';
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

  selectedCar!: Car;

  constructor(
    private driverSvc: DriverService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit(): void {

    this.getDriverIdFromUrl();

    this.loadDriver();
  }

  openUnassignCarModal(unassignCarModalTemplate: any, car: Car): void {

    this.selectedCar = car;

    this.modalService.open(unassignCarModalTemplate).result.then(
      () => {
        this.unassignCar();
      }
    );
  }

  //#region Private Functions

  private loadDriver(): void {

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

  private unassignCar(): void {

    this.driverSvc.unassignDriverCar(this.driver.id, this.selectedCar.id).subscribe({
      next: () => {
        // TODO notify success
        this.loadDriver();
      },
      error: (err: HttpErrorResponse) => {
        // TODO snackbar
        console.error(err);
      }
    });
  }

  //#endregion
}
