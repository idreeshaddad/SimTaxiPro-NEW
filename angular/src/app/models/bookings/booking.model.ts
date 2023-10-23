import { PaymentMethod } from "src/app/enums/paymentMethod.enum";

export interface Booking {
  id: number;
  from: string;
  to: string;
  pickUpTime: string;
  carTitle: string;
  driverFullName: string;
  price: number;
  isPaid: boolean;
  paymentMethod: PaymentMethod;
  paymentTime: string;
}
