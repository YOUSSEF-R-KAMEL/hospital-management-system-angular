import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-delete-doctor',
  templateUrl: './delete-doctor.component.html',
  styleUrl: './delete-doctor.component.scss',
})
export class DeleteDoctorComponent {
  doctorName!:string;
  title!:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data:any,
    private dialogRef:MatDialogRef<DeleteDoctorComponent>

  ) {
    this.doctorName = data.doctorName
    this.title = data.title
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete(){
    const deleteDoctor = true;
    this.dialogRef.close(deleteDoctor)
  }
}
