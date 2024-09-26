import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrl: './view-patient.component.scss',
})
export class ViewPatientComponent implements OnInit {
  currentPatient!: any;
  PatientID!: any;

  constructor(private dataApi: DataService, private route: ActivatedRoute) {
    this.PatientID = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.getPatientByID(this.PatientID);
  }

  getPatientByID(id: string) {
    this.dataApi.getPatientByID(id).subscribe((res) => {
      this.currentPatient = res
      this.currentPatient.admission_date = this.currentPatient.admission_date.toDate()
      // console.log(this.currentPatient)
    });
  }
}
