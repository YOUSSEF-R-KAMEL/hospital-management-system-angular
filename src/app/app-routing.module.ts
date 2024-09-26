import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './Components/dashboard/doctor/doctor.component';
import { PatientComponent } from './Components/dashboard/patient/patient.component';
import { ViewDoctorComponent } from './Components/dashboard/doctor/view-doctor/view-doctor.component';
import { ViewPatientComponent } from './Components/dashboard/patient/view-patient/view-patient.component';
import { LoginComponent } from './Components/auth/login/login.component';
import { AuthGuardGuard } from './shared/guard/auth-guard.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'dashboard', children:
    [
      {path: '', redirectTo: 'patient', pathMatch: 'full'},
      {path: 'patient', component: PatientComponent},
      {path: 'patient/:id', component: ViewPatientComponent},
      {path: 'doctor', component: DoctorComponent},
      {path: 'doctor/:id', component: ViewDoctorComponent},
    ],
    canActivate: [AuthGuardGuard]
  },
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
