import { Component, OnInit } from '@angular/core';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private gem:GlobalEventManagerService, private router:Router) { }
  category:string;
  ngOnInit() {
  }

  getAdsForCategory(category){
    this.category=category;
    this.router.navigate(["ads"]);
    
 
  }

  ngOnDestroy(){
    this.gem.updateCategoryFilter(this.category);
  }
  



}
