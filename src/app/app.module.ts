import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { environment } from 'src/environments/environment.development';
import { MaterialModule } from './material/material/material.module';
import { DoctorComponent } from './Components/dashboard/doctor/doctor.component';
import { PatientComponent } from './Components/dashboard/patient/patient.component';
import { SidebarComponent } from './Components/dashboard/sidebar/sidebar.component';
import { AddDoctorComponent } from './Components/dashboard/doctor/add-doctor/add-doctor.component';
import { AddPatientComponent } from './Components/dashboard/patient/add-patient/add-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewPatientComponent } from './Components/dashboard/patient/view-patient/view-patient.component';
import { ViewDoctorComponent } from './Components/dashboard/doctor/view-doctor/view-doctor.component';
import { DeleteDoctorComponent } from './Components/dashboard/doctor/delete-doctor/delete-doctor.component';
import { DeletePatientComponent } from './Components/dashboard/patient/delete-patient/delete-patient.component';
import { LoginComponent } from './Components/auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DoctorComponent,
    PatientComponent,
    SidebarComponent,
    AddDoctorComponent,
    AddPatientComponent,
    ViewPatientComponent,
    ViewDoctorComponent,
    DeleteDoctorComponent,
    DeletePatientComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
