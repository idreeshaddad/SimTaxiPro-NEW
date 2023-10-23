import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/enums/pageMode.enum';
import { PaymentMethod } from 'src/app/enums/paymentMethod.enum';
import { CreateUpdateBooking } from 'src/app/models/bookings/createUpdateBooking.model';
import { Lookup } from 'src/app/models/lookup.model';
import { BookingService } from 'src/app/services/booking.service';
import { CarService } from 'src/app/services/car.service';
import { DriverService } from 'src/app/services/driver.service';
import { PassengerService } from 'src/app/services/passenger.service';

@Component({
  selector: 'app-create-update-booking',
  templateUrl: './create-update-booking.component.html',
  styleUrls: ['./create-update-booking.component.css']
})
export class CreateUpdateBookingComponent implements OnInit {

  bookingId!: number;
  bookingForm!: FormGroup;
  bookingIdNumber!: number;

  pageMode: PageMode = PageMode.Create;
  pageModeEnum = PageMode;
  paymentMethodEnum = PaymentMethod;

  driversLookup: Lookup[] = [];
  carsLookup: Lookup[] = [];
  passengersLookup: Lookup[] = [];

  constructor(
    private bookingSvc: BookingService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private driverSvc: DriverService,
    private carSvc: CarService,
    private passengerSvc: PassengerService,
  ) { }

  ngOnInit(): void {

    this.buildForm();
    this.loadBookingId();
    this.setPageMode();

    if (this.pageMode == PageMode.Edit) {

      this.loadBooking();
    }

    this.loadLookups();
  }

  submitForm(): void {

    if (this.bookingForm.valid) {

      if (this.pageMode == PageMode.Create) {
        this.createBooking();
      }
      else {
        this.editBooking();
      }
    }
  }

  //#region Private Functions

  private buildForm(): void {

    this.bookingForm = this.fb.group({
      id: [0],
      from: ['', Validators.required],
      to: ['', Validators.required],
      pickUpTime: ['', Validators.required],
      passengerIds: ['', Validators.required],
      carId: [''],
      driverId: [''],
      price: ['', Validators.required],
      paymentMethod: ['', Validators.required]
    });
  }

  private loadBookingId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      const bookingIdStr = this.activatedRoute.snapshot.paramMap.get('id');
      this.bookingId = Number(bookingIdStr);
    }
  }

  private setPageMode(): void {

    if (this.bookingId) {
      this.pageMode = PageMode.Edit
    }
  }

  private loadBooking(): void {

    this.bookingSvc.getBookingForEdit(this.bookingId).subscribe({
      next: (booking: CreateUpdateBooking) => {
        this.bookingForm.patchValue(booking);
        this.bookingIdNumber = booking.id;
      },
      error: (err: HttpErrorResponse) => {
        // TODO show in snackbar
        alert(err);
        console.error(err);
      }
    });
  }

  private loadLookups() {
    this.loadDriversLookup();
    this.loadPassengersLookup();
    this.loadCarsLookup();
  }

  private loadDriversLookup() {

    this.driverSvc.getDriversLookup().subscribe({
      next: (driversLookupFromApi: Lookup[]) => {
        this.driversLookup = driversLookupFromApi;
      },
      error: (err: HttpErrorResponse) => {
        // TODO snackbar
        alert(err);
        console.error(err);
      }
    });
  }

  private loadPassengersLookup() {

    this.passengerSvc.getPassengersLookup().subscribe({
      next: (PassengersLookupFromApi: Lookup[]) => {
        this.passengersLookup = PassengersLookupFromApi;
      },
      error: (err: HttpErrorResponse) => {
        // TODO snackbar
        alert(err);
        console.error(err);
      }
    });
  }

  private loadCarsLookup() {

    this.carSvc.getCarsLookup().subscribe({
      next: (carsLookupFromApi: Lookup[]) => {
        this.carsLookup = carsLookupFromApi;
      },
      error: (err: HttpErrorResponse) => {
        // TODO snackbar
        alert(err);
        console.error(err);
      }
    });
  }

  private createBooking(): void {

    this.bookingSvc.createBooking(this.bookingForm.value).subscribe({
      next: () => {
        this.router.navigate(['/bookings']);
      },
      error: (err: HttpErrorResponse) => {
        // TODO snackbar
        alert(err);
        console.error(err);
      }
    });
  }

  private editBooking(): void {

    this.bookingSvc.editBooking(this.bookingId, this.bookingForm.value).subscribe({
      next: () => {
        this.router.navigate(['/bookings']);
      },
      error: (err: HttpErrorResponse) => {
        // TODO snackbar
        alert(err);
        console.error(err);
      }
    });
  }

  //#endregion
}
