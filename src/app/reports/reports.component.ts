import { Component, OnInit } from '@angular/core';
import {Report} from '../model/report.model';
import {ShowReportsService} from '../service/show-reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reports:Report[];

  constructor(private reportsService:ShowReportsService) { }

  ngOnInit() {

    this.reportsService.getAllReports().subscribe(reports =>{
      console.log(reports);
      this.reports = reports;
    })

  }

}
