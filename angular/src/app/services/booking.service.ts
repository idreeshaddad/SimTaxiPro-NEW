import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../models/bookings/booking.model';
import { BookingDetails } from '../models/bookings/bookingDetails.model';
import { CreateUpdateBooking } from '../models/bookings/createUpdateBooking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl: string = 'https://localhost:7138/api/Bookings';

  constructor(private http: HttpClient) { }

  getBookings(): Observable<Booking[]> {

    return this.http.get<Booking[]>(`${this.apiUrl}/GetBookings`);
  }

  getBooking(id: number): Observable<BookingDetails> {

    return this.http.get<BookingDetails>(`${this.apiUrl}/GetBooking/${id}`);
  }

  createBooking(booking: CreateUpdateBooking): Observable<any> {

    return this.http.post(`${this.apiUrl}/CreateBooking`, booking);
  }

  getBookingForEdit(id: number): Observable<CreateUpdateBooking> {

    return this.http.get<CreateUpdateBooking>(`${this.apiUrl}/GetBookingForEdit/${id}`)
  }

  editBooking(id: number, booking: CreateUpdateBooking): Observable<any> {

    return this.http.put(`${this.apiUrl}/EditBooking/${id}`, booking);
  }

  deleteBooking(id: number): Observable<any> {

    return this.http.delete(`${this.apiUrl}/DeleteBooking/${id}`);
  }

  payBooking(id: number): Observable<any> {

    return this.http.post(`${this.apiUrl}/PayBooking`, id);
  }

  unpayBooking(id: number): Observable<any> {

    return this.http.post(`${this.apiUrl}/UnpayBooking`, id);
  }
}
