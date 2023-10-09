import { Gender } from "src/app/enums/gender.enum";

export interface Passenger {
  id: number;
  fullName: string;
  phoneNumber: string;
  gender: Gender;
  age: string;
}
