import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DriverDetails } from 'src/app/models/drivers/driverDetails.model';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-create-update-driver',
  templateUrl: './create-update-driver.component.html',
  styleUrls: ['./create-update-driver.component.css']
})
export class CreateUpdateDriverComponent implements OnInit {

  driverId!: number;
  driverForm!: FormGroup;

  constructor(
    private driverSvc: DriverService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.loadDriverId();

    this.createDriverForm();

    if (this.driverId) {
      this.loadDriver();
    }
  }

  submitForm(): void {

    if (this.driverForm.valid) {
      // TODO send form to the api endpoint Create OR Edit
    }
  }

  //#region Private Methods

  private loadDriverId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      const driverIdString = this.activatedRoute.snapshot.paramMap.get('id');
      this.driverId = Number(driverIdString);
    }

  }

  private loadDriver(): void {

    this.driverSvc.getDriver(this.driverId).subscribe({
      next: (driverFromApi: DriverDetails) => {
        // TODO load the driver and patch it to DriverForm
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
      gender: ['', Validators.required]
    });

  }

  //#endregion
}
