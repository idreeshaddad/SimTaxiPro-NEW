import { PaymentMethod } from "src/app/enums/paymenetMethod.enum";
import { Passenger } from "../passengers/passenger.model";

export interface BookingDetails {
  id: number;
  from: string;
  to: string;
  pickUpTime: string;
  carTitle: string;
  driverFullName: string;
  passengers: Passenger[];
  price: number;
  isPaid: boolean;
  paymentMethod: PaymentMethod;
}
