import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { DriversComponent } from './drivers/drivers.component';
import { HttpClientModule } from '@angular/common/http';
import { DriverDetailsComponent } from './drivers/driver-details/driver-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DriversComponent,
    DriverDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
