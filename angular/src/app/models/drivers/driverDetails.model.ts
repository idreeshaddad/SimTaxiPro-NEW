import { CarList } from "../cars/carList.model";

export interface DriverDetails {
  id: number;
  fullName: string;
  ssn: string;
  age: number,
  gender: number;
  cars: CarList[];
}
