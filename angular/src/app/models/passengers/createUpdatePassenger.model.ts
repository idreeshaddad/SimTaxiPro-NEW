import { Gender } from "src/app/enums/gender.enum";
import { Booking } from "../bookings/booking.model";

export interface CreateUpdatePassenger {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: Gender;
  fullName: string;
}
