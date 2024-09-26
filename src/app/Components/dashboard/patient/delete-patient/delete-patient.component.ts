import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-patient',
  templateUrl: './delete-patient.component.html',
  styleUrl: './delete-patient.component.scss'
})
export class DeletePatientComponent {
  patientName!:string;
  title!:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data:any,
    private dialogRef:MatDialogRef<DeletePatientComponent>

  ) {
    this.patientName = data.patientName
    this.title = data.title
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  delete(){
    const deletePatient = true;
    this.dialogRef.close(deletePatient)
  }
}
