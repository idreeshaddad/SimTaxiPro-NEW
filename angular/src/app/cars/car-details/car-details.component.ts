import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetails } from 'src/app/models/cars/carDetails.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  carId!: number;
  car!: CarDetails;

  constructor(
    private carSvc: CarService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.loadCarId();

    this.loadCar();
  }

  //#region Private Functions

  private loadCarId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      const carIdString = this.activatedRoute.snapshot.paramMap.get('id');
      this.carId = Number(carIdString);
    }
  }

  private loadCar(): void {

    this.carSvc.getCar(this.carId).subscribe({
      next: (carFromApi: CarDetails) => {
        this.car = carFromApi
      }
    })
  }

  //#endregion
}
