import { Component, OnInit } from '@angular/core';
import { Driver } from '../models/drivers/driver.model';
import { DriverService } from '../services/driver.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Gender } from '../enums/gender.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(
    private driverSvc: DriverService,
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
