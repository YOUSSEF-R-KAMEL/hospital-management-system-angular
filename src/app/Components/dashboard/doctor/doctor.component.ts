import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteDoctorComponent } from './delete-doctor/delete-doctor.component';
import { Doctor } from 'src/app/shared/model/doctor';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
})
export class DoctorComponent implements OnInit {
  allDoctorsArr: Doctor[] = [];
  displayedColumns: string[] = [
    'name',
    'mobile',
    'email',
    'department',
    'gender',
    'action',
  ];
  dataSource!: MatTableDataSource<Doctor>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private dataApi: DataService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllDoctors();
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

  addDoctor() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Register doctor',
      buttonName: 'Register',
    };

    const dialogRef = this.dialog.open(AddDoctorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.dataApi.addDoctor(data);
        this.openSnackBar('Registration of doctor is successful', 'OK');
      }
    });
  }

  getAllDoctors() {
    this.dataApi.getAllDoctors().subscribe((res) => {
      // this.doctorsArr = res
      this.allDoctorsArr = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
      // console.log(this.allDoctorsArr);
      if(this.allDoctorsArr.length > 0)
        this.dataSource = new MatTableDataSource(this.allDoctorsArr);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  updateDoctor(row: any) {
    if(row.id == null || row.name == null){
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = 'Edit Doctor';
    dialogConfig.data.buttonName = "Update";
    dialogConfig.data.birthdate = row.birthdate.toDate();

    const dialogRef = this.dialog.open(AddDoctorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.dataApi.updateDoctor(data);
        this.openSnackBar('Doctor is Update successfully', 'OK');
      }
    });
  }

  deleteDoctor(row:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Delete Doctor',
      doctorName: row.name
    };

    const dialogRef = this.dialog.open(DeleteDoctorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.dataApi.deleteDoctor(row.id);
        this.openSnackBar('Doctor is Deleted successfully', 'OK');
      }
    });
  }

  getDoctorByID(row:any){
    window.open('/dashboard/doctor/' + row.id, '_blank')
  }



}
