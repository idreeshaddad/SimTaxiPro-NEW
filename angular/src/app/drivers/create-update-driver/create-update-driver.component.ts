import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/enums/pageMode.enum';
import { CreateUpdateDriver } from 'src/app/models/drivers/createUpdateDriver.model';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-create-update-driver',
  templateUrl: './create-update-driver.component.html',
  styleUrls: ['./create-update-driver.component.css']
})
export class CreateUpdateDriverComponent implements OnInit {

  pageModeEnum = PageMode;

  driverId!: number;
  driverForm!: FormGroup;
  pageMode: PageMode = PageMode.Create;

  constructor(
    private driverSvc: DriverService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    this.loadDriverId();
    this.setPageMode();

    this.createDriverForm();

    if (this.pageMode == PageMode.Edit) {
      this.loadDriver();
    }
  }

  submitForm(): void {

    if (this.driverForm.valid) {

      const driver: CreateUpdateDriver = this.driverForm.value;
      driver.gender = Number(this.driverForm.controls['gender'].value);

      if (this.pageMode == PageMode.Create) {

        this.driverSvc.createDriver(driver).subscribe({
          next: () => {
            this.router.navigate(['drivers']);
          },
          error: (err: HttpErrorResponse) => {
            // TODO show error in snackbar
            console.log(err);
          }
        });
      }
      else {

        this.driverSvc.editDriver(driver.id, driver).subscribe({
          next: () => {
            this.router.navigate(['drivers']);
          },
          error: (err: HttpErrorResponse) => {
            // TODO show error in snackbar
            console.log(err);
          }
        });
      }
    }
  }

  //#region Private Methods

  private loadDriverId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      const driverIdString = this.activatedRoute.snapshot.paramMap.get('id');
      this.driverId = Number(driverIdString);
    }

  }

  private setPageMode(): void {

    if (this.driverId) {
      this.pageMode = PageMode.Edit;
    }
  }

  private loadDriver(): void {

    this.driverSvc.getDriverForEdit(this.driverId).subscribe({
      next: (driverFromApi: CreateUpdateDriver) => {
        this.driverForm.patchValue(driverFromApi);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }

    });
  }

  private createDriverForm() {

    this.driverForm = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      ssn: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: [, Validators.required]
    });

  }

  //#endregion
}
