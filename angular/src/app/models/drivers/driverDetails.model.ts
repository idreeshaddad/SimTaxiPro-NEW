import { Car } from "../cars/car.model";

export interface DriverDetails {
  id: number;
  fullName: string;
  ssn: string;
  age: number,
  gender: number;
  cars: Car[];
}
