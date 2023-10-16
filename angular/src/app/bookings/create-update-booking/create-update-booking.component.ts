import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/enums/pageMode.enum';
import { CreateUpdateBooking } from 'src/app/models/bookings/createUpdateBooking.model';
import { Lookup } from 'src/app/models/lookup.model';
import { BookingService } from 'src/app/services/booking.service';
import { DriverService } from 'src/app/services/driver.service';

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

  driversLookup: Lookup[] = [];

  constructor(
    private bookingSvc: BookingService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private driverSvc: DriverService
  ) { }

  ngOnInit(): void {

    this.buildForm();
    this.loadBookingId();
    this.setPageMode();

    if (this.pageMode == PageMode.Edit) {

      this.loadBooking();
    }

    this.loadDriversLookup();
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
      isPaid: [''],
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

  //#endregion
}
