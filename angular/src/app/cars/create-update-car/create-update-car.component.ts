import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/enums/pageMode.enum';
import { CreateUpdateCar } from 'src/app/models/cars/createUpdateCar.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-create-update-car',
  templateUrl: './create-update-car.component.html',
  styleUrls: ['./create-update-car.component.css']
})
export class CreateUpdateCarComponent implements OnInit {

  carForm!: FormGroup;
  carId!: number;
  carTitle!: string;

  pageMode: PageMode = PageMode.Create;
  pageModeEnum = PageMode;

  constructor(
    private carSvc: CarService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.buildForm();

    this.loadCarId();

    this.setPageMode();

    if (this.pageMode == PageMode.Edit) {
      this.loadCar();
    }

  }

  submitForm(): void {

    if (this.carForm.valid) {

      if (this.pageMode == PageMode.Create) {
        this.createCar();
      }
      else {
        this.editCar();
      }
    }
  }

  //#region Private Functions

  private buildForm() {

    this.carForm = this.fb.group({
      id: [0],
      productionYear: ['', Validators.required],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      plateNumber: ['', Validators.required],
    });
  }

  private loadCarId(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      const carIdString = this.activatedRoute.snapshot.paramMap.get('id');
      this.carId = Number(carIdString);
    }
  }

  private setPageMode(): void {

    if (this.carId) {
      this.pageMode = PageMode.Edit;
    }
  }

  private loadCar(): void {

    this.carSvc.getCarForEdit(this.carId).subscribe({
      next: (carFromApi: CreateUpdateCar) => {
        this.carForm.patchValue(carFromApi);
        this.carTitle = carFromApi.title;
      },
      error: (err: HttpErrorResponse) => {
        // TODO show in snackbar
        alert(err);
        console.log(err);
      }
    });
  }

  private createCar(): void {

    this.carSvc.createCar(this.carForm.value).subscribe({
      next: () => {
        this.router.navigate(['/cars']);
      },
      error: (err: HttpErrorResponse) => {
        // TODO show error in snackbar
        alert(err);
      }
    });
  }

  private editCar(): void {

    this.carSvc.editCar(this.carId, this.carForm.value).subscribe({
      next: () => {
        this.router.navigate(['/cars']);
      },
      error: (err: HttpErrorResponse) => {
        // TODO show error in snackbar
        alert(err);
      }
    });
  }

  //#endregion
}
