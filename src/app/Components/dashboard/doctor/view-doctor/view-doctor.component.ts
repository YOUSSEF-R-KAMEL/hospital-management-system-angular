import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from 'src/app/shared/model/patient';
import { MatSort } from '@angular/material/sort';
import { DeletePatientComponent } from '../../patient/delete-patient/delete-patient.component';
import { AddPatientComponent } from '../../patient/add-patient/add-patient.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrl: './view-doctor.component.scss'
})
export class ViewDoctorComponent implements OnInit {
  id!:any;
  allPatientsForThisDoctor: any[] = [];
  viewData:any= []
  dataSource!: MatTableDataSource<Patient>;
  displayedColumns: string[] = [
    'patient_name',
    'mobile',
    'doctor_name',
    'gender',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route:ActivatedRoute,
              private dataApi:DataService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar
            ){
    this.id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.getDoctorByID()
    this.getPatientsForDoctors()
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDoctorByID(){
    this.dataApi.getDoctorByID(this.id).subscribe(data => {
      this.viewData = data
    })
  }

  getPatientsForDoctors(){
    this.dataApi.getAllPatient().subscribe(res => {
      this.allPatientsForThisDoctor = res.map((e:any) => {
        const data = e.payload.doc.data()
        if(data.doctor_id == this.id){
          data.patient_id = e.payload.doc.id;
          return data
        }
      })
      this.allPatientsForThisDoctor = this.allPatientsForThisDoctor.filter(item => item != undefined);
      if(this.allPatientsForThisDoctor.length > 0)
        this.dataSource = new MatTableDataSource(this.allPatientsForThisDoctor)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log(this.allPatientsForThisDoctor)
    })
  }

  getPatientByID(data:any){
    window.open('../../dashboard/patient/' + data.patient_id, '_blank')
    console.log(data)
  }
  
  updatePatient(row : any) {
    if(row.patient_id == null || row.patient_name == null) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = "Edit patient";
    dialogConfig.data.buttonName = "Update";
    dialogConfig.data.admission_date = row.admission_date.toDate();

    console.log(dialogConfig.data);

    const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.updatePatient(data);
        this.openSnackBar("Patient is updated successfully.", "OK")
      }
    })
  }

  deletePatient(row:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Delete Patient',
      patientName: row.patient_name
    };

    const dialogRef = this.dialog.open(DeletePatientComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.dataApi.deletePatient(row.patient_id);
        this.openSnackBar('Patient is Deleted successfully', 'OK');
      }
    });

    this.getPatientsForDoctors()

  }
}
