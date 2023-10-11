import { Passenger } from "../passengers/passenger.model";

export interface CreateUpdateBooking {
  id: number;
  from: string;
  to: string;
  pickUpTime: string;
  passengerIds: number[];
  carId: number;
  driverId: number;
}
