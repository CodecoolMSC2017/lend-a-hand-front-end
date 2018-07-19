import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FilterAdsService} from '../filter-ads.service';
import {Filter} from '../filter.model';
import {AdService} from '../ad.service';
@Component({
  selector: 'app-ad-filter',
  templateUrl: './ad-filter.component.html',
  styleUrls: ['./ad-filter.component.css']
})
export class AdFilterComponent implements OnInit {

  categories = ['All', 'Babysitting', 'IT', 'Garden', 'Learning', 'Building'];
  selectedCategory : string;
  filter:Filter;

  filterForm : FormGroup;
  

  constructor(private adservice:AdService,private formBuilder: FormBuilder, private filterService:FilterAdsService) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
    categories: [[Validators.required]]
    
});
  }

  filterAds(){
    this.adservice.getAdsByCategory(this.selectedCategory);
    
  }

}
