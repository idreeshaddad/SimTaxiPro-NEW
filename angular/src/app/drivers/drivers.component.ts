import { Component, OnInit } from '@angular/core';
import { Driver } from '../models/drivers/driver.model';
import { DriverService } from '../services/driver.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Gender } from '../enums/gender.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from '../services/car.service';
import { Lookup } from '../models/lookup.model';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  genderEnum = Gender;

  drivers: Driver[] = [];
  showLoader: boolean = true;
  selectedDriver!: Driver;

  availableCarsLookup!: Lookup[];

  constructor(
    private driverSvc: DriverService,
    private carSvc: CarService,
    private modalService: NgbModal) { }

  ngOnInit(): void {

    this.loadDrivers();
  }

  openDeleteModal(deleteModalTemplate: any, driver: Driver): void {

    this.selectedDriver = driver;
    this.modalService.open(deleteModalTemplate).result.then(
      () => {
        this.deleteDriver();
      }
    );
  }

  openAssignCarsModal(AssignCarsModalTemplate: any, driver: Driver): void {

    this.carSvc.getAvailableCarsLookup().subscribe({
      next: (availableCarsFromApi: Lookup[]) => {
        this.availableCarsLookup = availableCarsFromApi;
      }
    });

    this.selectedDriver = driver;
    this.modalService.open(AssignCarsModalTemplate).result.then(
      () => {
        // TODO call assign driver cars api
      }
    );
  }

  updateSelectedCars(): void {

  }

  //#region Private Function

  private loadDrivers(): void {

    this.driverSvc.getDrivers().subscribe({
      next: (driverListArrayFromApi: Driver[]) => {
        this.drivers = driverListArrayFromApi;
        this.showLoader = false;
      },
      error: (err: HttpErrorResponse) => {
        alert(err);
      }
    });
  }

  private deleteDriver(): void {

    this.driverSvc.deleteDriver(this.selectedDriver.id).subscribe({
      next: () => {
        this.loadDrivers();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  //#endregion

}
