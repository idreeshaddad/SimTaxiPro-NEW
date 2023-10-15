import { Component, OnInit } from '@angular/core';
import { Booking } from '../models/bookings/booking.model';
import { BookingService } from '../services/booking.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PaymentMethod } from '../enums/paymenetMethod.enum';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  bookings!: Booking[];

  paymentMethodEnum = PaymentMethod;

  constructor(
    private bookingSvc: BookingService
  ) { }

  ngOnInit(): void {

    this.loadBookings();
  }

  //#region Private Functions

  private loadBookings(): void {

    this.bookingSvc.getBookings().subscribe({
      next: (bookingsFromApi: Booking[]) => {
        this.bookings = bookingsFromApi;
      },
      error: (err: HttpErrorResponse) => {
        // TODO show err in snackbar
        alert(err);
        console.error(err);
      }
    });
  }

  //#endregion
}
