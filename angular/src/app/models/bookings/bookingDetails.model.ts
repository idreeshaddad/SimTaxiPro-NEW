import { Passenger } from "../passengers/passenger.model";

export interface BookingDetails {
  id: number;
  from: string;
  to: string;
  pickUpTime: string;
  carTitle: string;
  driverFullName: string;
  passengers: Passenger[];
}
