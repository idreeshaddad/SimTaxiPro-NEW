import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Gender } from '../enums/gender.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from '../services/car.service';
import { Car } from '../models/cars/car.model';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  genderEnum = Gender;

  showLoader: boolean = true;
  cars: Car[] = [];
  selectedCar!: Car;

  constructor(
    private carSvc: CarService,
    private modalService: NgbModal) { }

  ngOnInit(): void {

    this.loadCars();
  }

  openDeleteModal(deleteModalTemplate: any, car: Car): void {

    this.selectedCar = car;
    this.modalService.open(deleteModalTemplate).result.then(
      () => {
        this.deleteCar();
      }
    );
  }

  //#region Private Function

  private loadCars(): void {

    this.carSvc.getCars().subscribe({
      next: (carsFromApi: Car[]) => {
        this.cars = carsFromApi;
        this.showLoader = false;
      },
      error: (err: HttpErrorResponse) => {
        alert(err);
      }
    });
  }

  private deleteCar(): void {

    this.carSvc.deleteCar(this.selectedCar.id).subscribe({
      next: () => {
        this.loadCars();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  //#endregion
}
