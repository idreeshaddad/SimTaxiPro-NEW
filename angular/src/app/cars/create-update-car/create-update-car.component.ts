import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateUpdateCar } from 'src/app/models/cars/createUpdateCar.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-create-update-car',
  templateUrl: './create-update-car.component.html',
  styleUrls: ['./create-update-car.component.css']
})
export class CreateUpdateCarComponent implements OnInit {

  carForm!: FormGroup;

  constructor(
    private carSvc: CarService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.buildForm();

  }

  submitForm(): void {

    if (this.carForm.valid) {

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

  //#endregion
}
