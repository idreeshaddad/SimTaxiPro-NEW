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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarsComponent } from './cars/cars.component';
import { CarDetailsComponent } from './cars/car-details/car-details.component';
import { CreateUpdateCarComponent } from './cars/create-update-car/create-update-car.component';
import { PassengersComponent } from './passengers/passengers.component';
import { PassengerDetailsComponent } from './passengers/passenger-details/passenger-details.component';
import { CreateUpdatePassengerComponent } from './passengers/create-update-passenger/create-update-passenger.component';
import { BookingsComponent } from './bookings/bookings.component';
import { BookingDetailsComponent } from './bookings/booking-details/booking-details.component';
import { CreateUpdateBookingComponent } from './bookings/create-update-booking/create-update-booking.component';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { NgSelectModule } from '@ng-select/ng-select';

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
    PassengersComponent,
    PassengerDetailsComponent,
    CreateUpdatePassengerComponent,
    BookingsComponent,
    BookingDetailsComponent,
    CreateUpdateBookingComponent,
    EnumToArrayPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
