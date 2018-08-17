<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import {Report} from '../model/report.model';
import {ShowReportsService} from '../service/show-reports.service';
import {User} from '../model/user.model';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {AdService} from '../service/ad.service';

=======
import {Component, OnInit} from "@angular/core";
import {Report} from "../model/report.model";
import {ShowReportsService} from "../service/show-reports.service";
import {User} from "../model/user.model";
import {GlobalEventManagerService} from "../service/global-event-manager.service";
>>>>>>> eabaa04302f992b3b7a251f6e36a97b12af9759f

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

<<<<<<< HEAD
  userReports:Report[];
  adReports:Report[];
  user:User;
  constructor(private reportsService:ShowReportsService, private gem:GlobalEventManagerService,private router:Router, private userService:UserService,private adService:AdService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.gem.updateUser(this.user);
    this.reportsService.getUserReports().subscribe(reports =>{
      
      this.userReports = reports;
    });

    this.reportsService.getAdReports().subscribe(reports =>{
      
      this.adReports = reports;
    });

  }

  toReportedAd(adId){
    this.adService.getAdById(adId).subscribe(ad=>{
      this.gem.updateSingleAd(ad);
      this.router.navigate(["ad"]);
    })
  }

  toProfile(userId){
    
    this.userService.getUserById(userId).subscribe(user=>{
      this.gem.updateProfile(user);
    this.router.navigate(['profile']);
    });
    
    
  }

  showUserReports(){
    if(document.getElementById("userReportsDiv").classList.contains("hidden")){
        document.getElementById("userReportsDiv").classList.remove("hidden");
        document.getElementById("adReportsDiv").classList.add("hidden");
=======
    userReports: Report[];
    adReports: Report[];
    user: User;

    constructor(private reportsService: ShowReportsService, private gem: GlobalEventManagerService) {
>>>>>>> eabaa04302f992b3b7a251f6e36a97b12af9759f
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.gem.updateUser(this.user);
        this.reportsService.getUserReports().subscribe(reports => {

            this.userReports = reports;
        });

        this.reportsService.getAdReports().subscribe(reports => {

            this.adReports = reports;
        });

    }

    showUserReports() {
        if (document.getElementById("userReportsDiv").classList.contains("hidden")) {
            document.getElementById("userReportsDiv").classList.remove("hidden");
            document.getElementById("adReportsDiv").classList.add("hidden");
        }

    }

    showAdReports() {
        if (document.getElementById("adReportsDiv").classList.contains("hidden")) {
            document.getElementById("adReportsDiv").classList.remove("hidden");
            document.getElementById("userReportsDiv").classList.add("hidden");
        }

    }

}
