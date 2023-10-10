import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/enums/pageMode.enum';
import { CreateUpdatePassenger } from 'src/app/models/passengers/createUpdatePassenger.model';
import { PassengerService } from 'src/app/services/passenger.service';

@Component({
  selector: 'app-create-update-passenger',
  templateUrl: './create-update-passenger.component.html',
  styleUrls: ['./create-update-passenger.component.css']
})
export class CreateUpdatePassengerComponent implements OnInit {

  passengerId!: number;
  passengerForm!: FormGroup;
  passengerFullName!: string;

  pageMode: PageMode = PageMode.Create;
  pageModeEnum = PageMode;

  constructor(
    private passengerSvc: PassengerService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.buildPassengerForm();

    this.loadPassengerIdFromUrl();

    this.setPageMode();

    if (this.pageMode == PageMode.Edit) {
      this.loadPassengerFromApi();
    }
  }

  submitForm(): void {

    if (this.passengerForm.valid) {

      const passenger: CreateUpdatePassenger = this.passengerForm.value;
      passenger.gender = Number(this.passengerForm.controls['gender'].value);

      if (this.pageMode == PageMode.Create) {
        this.createPassenger(passenger);
      }
      else {
        this.savePassenger(passenger);
      }
    }

  }


  //#region Private Functions

  private buildPassengerForm(): void {

    this.passengerForm = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  private loadPassengerIdFromUrl(): void {

    if (this.getIdFromUrl()) {

      const passengerIdSting = this.getIdFromUrl();

      this.passengerId = Number(passengerIdSting);
    }
  }

  private getIdFromUrl(): string | null {

    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  private setPageMode(): void {

    if (this.passengerId) {
      this.pageMode = PageMode.Edit;
    }
  }

  private loadPassengerFromApi(): void {

    this.passengerSvc.getPassengerForEdit(this.passengerId).subscribe({

      next: (passengerFromApi: CreateUpdatePassenger) => {

        this.passengerForm.patchValue(passengerFromApi);
        this.passengerFullName = passengerFromApi.fullName;
      },
      error: (err: HttpErrorResponse) => {
        // TODO show error in snackbar
        alert(err);
        console.error(err);
      }
    });
  }

  private createPassenger(passenger: CreateUpdatePassenger): void {

    this.passengerSvc.createPassenger(passenger).subscribe({
      next: () => {
        // TODO show success msg on snackbar
        this.router.navigate(['/passengers']);
      },
      error: (err: HttpErrorResponse) => {
        // TODO show snackbar
        alert(err);
        console.error(err);
      }
    });
  }

  private savePassenger(passenger: CreateUpdatePassenger): void {

    this.passengerSvc.editPassenger(this.passengerId, passenger).subscribe({
      next: () => {
        // TODO show success msg on snackbar
        this.router.navigate(['/passengers']);
      },
      error: (err: HttpErrorResponse) => {
        // TODO show snackbar
        alert(err);
        console.error(err);
      }
    });
  }

  //#endregion
}
