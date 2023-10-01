import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DriversComponent } from './drivers/drivers.component';
import { DriverDetailsComponent } from './drivers/driver-details/driver-details.component';
import { CreateUpdateDriverComponent } from './drivers/create-update-driver/create-update-driver.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "drivers", component: DriversComponent },
  { path: "drivers/details/:id", component: DriverDetailsComponent },
  { path: "drivers/create", component: CreateUpdateDriverComponent },
  { path: "drivers/edit/:id", component: CreateUpdateDriverComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
