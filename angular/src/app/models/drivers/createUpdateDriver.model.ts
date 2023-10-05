import { Gender } from "src/app/enums/gender.enum";

export interface CreateUpdateDriver {
  id: number;
  firstName: string;
  lastName: string;
  ssn: string;
  dateOfBirth: string,
  gender: Gender;
  fullName: string;
}
