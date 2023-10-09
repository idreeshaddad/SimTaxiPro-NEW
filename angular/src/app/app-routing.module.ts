import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DriversComponent } from './drivers/drivers.component';
import { DriverDetailsComponent } from './drivers/driver-details/driver-details.component';
import { CreateUpdateDriverComponent } from './drivers/create-update-driver/create-update-driver.component';
import { CarsComponent } from './cars/cars.component';
import { CarDetailsComponent } from './cars/car-details/car-details.component';
import { CreateUpdateCarComponent } from './cars/create-update-car/create-update-car.component';
import { PassengersComponent } from './passengers/passengers.component';
import { PassengerDetailsComponent } from './passengers/passenger-details/passenger-details.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "drivers", component: DriversComponent },
  { path: "drivers/details/:id", component: DriverDetailsComponent },
  { path: "drivers/create", component: CreateUpdateDriverComponent },
  { path: "drivers/edit/:id", component: CreateUpdateDriverComponent },

  { path: "cars", component: CarsComponent },
  { path: "cars/details/:id", component: CarDetailsComponent },
  { path: "cars/create", component: CreateUpdateCarComponent },
  { path: "cars/edit/:id", component: CreateUpdateCarComponent },

  { path: "passengers", component: PassengersComponent },
  { path: "passengers/details/:id", component: PassengerDetailsComponent },
  // { path: "passengers/create", component: CreateUpdatePassengerComponent },
  // { path: "passengers/edit/:id", component: CreateUpdatePassengerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
