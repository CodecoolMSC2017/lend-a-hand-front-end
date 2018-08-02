import { Component, OnInit } from '@angular/core';
import {AdService} from '../service/ad.service';
import {Ad} from '../model/ad.model';
import {User} from '../model/user.model';
import {Router} from '@angular/router';
import { error } from 'protractor';
@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.css']
})
export class CreateAdComponent implements OnInit {

  categories = ['Beauty', 'Child care', 'Construction', 'Education', 'Garden', 'Health care', 'Housework', 'IT', 'Office', 'Pets', 'Repair', 'Sports', 'Vehicle'];
  selectedCategory: string;
  selectedType: string;
  isPremium:boolean;
  adTitle:string;
  adDescription:string;
  ad:Ad;
  user:User;

  constructor(private adservice:AdService, private router:Router) { }

  ngOnInit() {
    this.user=JSON.parse(sessionStorage.getItem('user'));
    this.ad=new Ad();
  }

  sendAd(){
    this.ad.advertiserName=this.user.userName;
    this.ad.advertiserId=this.user.id;
    this.ad.isPremium=this.isPremium;
    this.ad.category = this.selectedCategory;
    this.ad.description = this.adDescription;
    this.ad.title = this.adTitle;
    this.ad.type = this.selectedType;
    this.ad.pictureLink = '';
    
    this.adservice.createAd(this.ad).subscribe(ad =>{
      console.log(ad);
    }, error => {
      console.log(error);
    }
    );

    this.router.navigate(["categories"]);

  }

}
