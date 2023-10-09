import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gender } from 'src/app/enums/gender.enum';
import { PassengerDetails } from 'src/app/models/passengers/passengerDetails.model';
import { PassengerService } from 'src/app/services/passenger.service';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.css']
})
export class PassengerDetailsComponent implements OnInit {

  passengerId!: number;
  passenger!: PassengerDetails;
  genderEnum = Gender;

  constructor(
    private passengerSvc: PassengerService,
    private activatedRounte: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.loadPassengerId();
    this.loadPassenger();
  }

  //#region Private Functions

  private loadPassengerId(): void {

    if (this.activatedRounte.snapshot.paramMap.get('id')) {

      const passengerIdString = this.activatedRounte.snapshot.paramMap.get('id');
      this.passengerId = Number(passengerIdString);
    }
  }

  private loadPassenger(): void {

    this.passengerSvc.getPassenger(this.passengerId).subscribe({
      next: (passengerFromApi: PassengerDetails) => {
        this.passenger = passengerFromApi;
      },
      error: (err: HttpErrorResponse) => {
        // TODO show in snackbar
        alert(err);
        console.error(err);
      }
    });
  }

  //#endregion

}
