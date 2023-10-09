import { Gender } from "src/app/enums/gender.enum";
import { Booking } from "../bookings/booking.model";

export interface PassengerDetails {
  id: number;
  fullName: string;
  phoneNumber: string;
  gender: Gender;
  age: string;
  bookings: Booking[]
}

