import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gender } from 'src/app/enums/gender.enum';
import { PaymentMethod } from 'src/app/enums/paymentMethod.enum';
import { BookingDetails } from 'src/app/models/bookings/bookingDetails.model';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

  bookingId!: number;
  booking!: BookingDetails;

  paymentMethodEnum = PaymentMethod;
  genderEnum = Gender;

  constructor(
    private bookingSvc: BookingService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.loadBookingId();

    this.loadBooking();
  }

  //#region Private Methods

  private loadBookingId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      const bookingIdStr = this.activatedRoute.snapshot.paramMap.get('id');
      this.bookingId = Number(bookingIdStr);
    }
  }

  private loadBooking(): void {

    this.bookingSvc.getBooking(this.bookingId).subscribe({
      next: (bookingFromApi: BookingDetails) => {
        this.booking = bookingFromApi;
      },
      error: (err: HttpErrorResponse) => {
        alert(err);
        console.error(err);
      }

    });
  }
  //#endregion

}
