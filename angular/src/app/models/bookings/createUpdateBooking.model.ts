import { PaymentMethod } from "src/app/enums/paymentMethod.enum";

export interface CreateUpdateBooking {
  id: number;
  from: string;
  to: string;
  pickUpTime: string;
  passengerIds: number[];
  carId: number;
  driverId: number;
  price: number;
  paymentMethod: PaymentMethod;
}
