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

  selectedCarsIds: number[] = [];

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

    this.loadAvailableCarsLookup();

    this.selectedDriver = driver;
    this.selectedCarsIds = [];

    this.modalService.open(AssignCarsModalTemplate, {
      size: 'lg'
    }).result.then(
      () => {
        this.assignCarsToDriver();
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

  private loadAvailableCarsLookup(): void {

    this.carSvc.getAvailableCarsLookup().subscribe({
      next: (availableCarsFromApi: Lookup[]) => {
        this.availableCarsLookup = availableCarsFromApi;
      }
    });
  }

  private assignCarsToDriver() {

    this.driverSvc.assignDriverCars(this.selectedDriver.id, this.selectedCarsIds).subscribe({
      next: () => {
        // TODO snackbar: successfully added to driver
      },
      error: (err: HttpErrorResponse) => {
        // TODO snackbar
        console.error(err);
      }
    });
  }

  //#endregion

}
