import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { DriversComponent } from './drivers/drivers.component';
import { HttpClientModule } from '@angular/common/http';
import { DriverDetailsComponent } from './drivers/driver-details/driver-details.component';
import { CreateUpdateDriverComponent } from './drivers/create-update-driver/create-update-driver.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarsComponent } from './cars/cars.component';
import { CarDetailsComponent } from './cars/car-details/car-details.component';
import { CreateUpdateCarComponent } from './cars/create-update-car/create-update-car.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DriversComponent,
    DriverDetailsComponent,
    CreateUpdateDriverComponent,
    CarsComponent,
    CarDetailsComponent,
    CreateUpdateCarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
