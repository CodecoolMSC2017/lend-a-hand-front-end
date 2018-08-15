import { Component, OnInit } from '@angular/core';
import {Reports} from '../model/reports.model';
import {ShowReportsService} from '../service/show-reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reports:Reports[];

  constructor(private reportsService:ShowReportsService) { }

  ngOnInit() {

    this.reportsService.getAllReports().subscribe(reports =>{
      console.log(reports);
      this.reports = reports;
    })

  }

}
