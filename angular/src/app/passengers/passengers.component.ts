import { Component, OnInit } from '@angular/core';
import { Passenger } from '../models/passengers/passenger.model';
import { PassengerService } from '../services/passenger.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Gender } from '../enums/gender.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {

  passengers!: Passenger[];
  selectedPassenger!: Passenger;

  genderEnum = Gender;

  constructor(
    private passengerSvc: PassengerService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {

    this.loadPassengers();
  }

  openDeleteModal(deleteModalTemplate: any, passenger: Passenger): void {

    this.selectedPassenger = passenger;
    this.modalService.open(deleteModalTemplate).result.then(
      () => {
        this.deletePassenger();
      }
    );
  }

  //#region Private Functions

  private loadPassengers(): void {

    this.passengerSvc.getPassengers().subscribe({
      next: (passengersFromApi: Passenger[]) => {
        this.passengers = passengersFromApi;
      },
      error: (err: HttpErrorResponse) => {
        // TODO show in snackbar
        alert(err);
        console.error(err);
      }
    });
  }

  private deletePassenger(): void {

    this.passengerSvc.deletePassenger(this.selectedPassenger.id).subscribe({
      next: () => {
        this.loadPassengers();
      },
      error: (err: HttpErrorResponse) => {
        // TODO show in snackerbar
        alert(err);
        console.error(err);
      }
    });
  }

  //#endregion
}
