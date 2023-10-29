import { Component, OnInit } from '@angular/core';
import { Booking } from '../models/bookings/booking.model';
import { BookingService } from '../services/booking.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PaymentMethod } from '../enums/paymentMethod.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  bookings!: Booking[];

  selectedBooking!: Booking;

  paymentMethodEnum = PaymentMethod;

  constructor(
    private bookingSvc: BookingService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {

    this.loadBookings();
  }

  openDeleteBookingModal(deleteBookingModalTemplate: any, booking: Booking): void {

    this.selectedBooking = booking;

    this.modalService.open(deleteBookingModalTemplate).result.then(
      (result) => {
        this.deleteBooking();
      });

  }

  openPayModal(payBookingModalTemplate: any, booking: Booking) {

    this.selectedBooking = booking;

    this.modalService.open(payBookingModalTemplate).result.then(
      (result) => {
        this.payBooking();
      }
    );
  }

  openUnpayModal(unPayBookingModalTemplate: any, booking: Booking) {

    this.selectedBooking = booking;

    this.modalService.open(unPayBookingModalTemplate).result.then(
      (result) => {
        this.unpayBooking();
      }
    );
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

  private deleteBooking(): void {

    this.bookingSvc.deleteBooking(this.selectedBooking.id).subscribe({
      next: () => {
        this.loadBookings();
      },
      error: (err: HttpErrorResponse) => {
        // TODO snackbar
        alert(err);
        console.error(err);
      }
    });

  }

  private payBooking(): void {

    this.bookingSvc.payBooking(this.selectedBooking.id).subscribe({
      next: () => {
        this.loadBookings();
      },
      error: (err: HttpErrorResponse) => {
        // TODO Snackbar
        alert(err);
        console.error(err);
      }
    });
  }

  private unpayBooking(): void {

    this.bookingSvc.unpayBooking(this.selectedBooking.id).subscribe({
      next: () => {
        this.loadBookings();
      },
      error: (err: HttpErrorResponse) => {
        // TODO Snackbar
        alert(err);
        console.error(err);
      }
    });
  }

  //#endregion
}
